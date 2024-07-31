import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { BytesLike, providers } from 'ethers'

import { createContract, increaseGasLimit } from '../helpers'
import { ConstantsRegistry__factory as ConstantsRegistryContract } from '../types'

export const createConstantsRegistryContract = (
  address: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  const { contractInstance, contractInterface } = createContract(
    address,
    rawProvider,
    ConstantsRegistryContract,
  )

  const providerInstance =
    provider.providerType !== PROVIDERS.Fallback
      ? new providers.Web3Provider(rawProvider as providers.ExternalProvider, 'any')
      : (rawProvider as unknown as providers.JsonRpcProvider)

  return {
    contractInstance,
    contractInterface,

    addConstant: async (key: string, value: BytesLike) => {
      const data = contractInterface.encodeFunctionData('addConstant', [key, value])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },

    removeConstant: async (key: string) => {
      const data = contractInterface.encodeFunctionData('removeConstant', [key])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },
  }
}
