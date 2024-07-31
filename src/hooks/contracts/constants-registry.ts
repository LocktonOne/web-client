import { type Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { type BytesLike, providers } from 'ethers'
import { useMemo } from 'react'

import { increaseGasLimit } from '@/helpers'
import { ConstantsRegistry__factory } from '@/types'

export const useConstantsRegistry = (
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

  const contractInterface = ConstantsRegistry__factory.createInterface()

  const addConstant = async (key: string, value: BytesLike) => {
    const data = contractInterface.encodeFunctionData('addConstant', [key, value])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
    })
  }

  const removeConstant = async (key: string) => {
    const data = contractInterface.encodeFunctionData('removeConstant', [key])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
    })
  }

  return {
    addConstant,
    removeConstant,
  }
}
