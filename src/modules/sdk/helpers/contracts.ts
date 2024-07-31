import { RawProvider } from '@distributedlab/w3p'
import type { Provider } from '@ethersproject/providers'
import { providers, Signer } from 'ethers'

type AbstractFactoryClass = {
  connect: (address: string, signerOrProvider: Signer | Provider) => unknown
  createInterface: () => unknown
}

type AbstractFactoryClassReturnType<F extends AbstractFactoryClass> = {
  contractInstance: ReturnType<F['connect']>
  contractInterface: ReturnType<F['createInterface']>
}

function getFallbackOrInjectedProvider(
  rawProvider: RawProvider,
): providers.JsonRpcProvider | providers.Web3Provider {
  const isFallback = rawProvider instanceof providers.JsonRpcProvider

  return isFallback
    ? (rawProvider as providers.JsonRpcProvider)
    : new providers.Web3Provider(rawProvider as providers.ExternalProvider, 'any')
}

export const createContract = <F extends AbstractFactoryClass>(
  address: string,
  rawProvider: RawProvider,
  factoryClass: F,
): AbstractFactoryClassReturnType<F> => {
  const providerOrSigner = getFallbackOrInjectedProvider(rawProvider)

  const contractInstance = factoryClass.connect(address, providerOrSigner) as ReturnType<
    F['connect']
  >

  const contractInterface = factoryClass.createInterface() as ReturnType<F['createInterface']>

  return {
    contractInstance,
    contractInterface,
  }
}
