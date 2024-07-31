import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'
import { useMemo } from 'react'

import { KYCRequests__factory } from '@/types'

export const useKycRequests = (
  contractAddress: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  const providerInstance = useMemo(
    () =>
      provider.providerType !== PROVIDERS.Fallback
        ? new providers.Web3Provider(rawProvider as providers.ExternalProvider, 'any')
        : (rawProvider as unknown as providers.JsonRpcProvider),
    [provider.providerType, rawProvider],
  )

  const contractInstance = useMemo(
    () =>
      (!!providerInstance && KYCRequests__factory.connect(contractAddress, providerInstance)) ||
      undefined,
    [contractAddress, providerInstance],
  )

  const contractInterface = KYCRequests__factory.createInterface()

  const dropKYCRequest = async () => {
    const data = contractInterface.encodeFunctionData('dropKYCRequest')

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  /**
   * create a request
   * @param storageId storage service entity id
   */
  const requestKYC = async (storageId: string) => {
    const data = contractInterface.encodeFunctionData('requestKYC', [storageId])
    // TODO: Fix gasLimit
    return provider.signAndSendTx({
      to: contractAddress,
      data,
      gasLimit: 25000,
    })
  }

  const usersRequestInfo = async (accountAddress: string) => {
    return contractInstance?.usersRequestInfo(accountAddress)
  }

  return {
    dropKYCRequest,
    requestKYC,
    usersRequestInfo,
  }
}
