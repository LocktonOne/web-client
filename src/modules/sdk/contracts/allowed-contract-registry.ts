import { Provider, RawProvider } from '@distributedlab/w3p'
import { ethers } from 'ethers'

import { createContract } from '../helpers'
import { AllowedContractRegistry__factory as AllowedContractRegistry } from '../types'

export const createAllowedContractRegistryContract = (
  address: string,
  rawProvider: RawProvider,
  provider: Provider,
) => {
  const { contractInstance, contractInterface } = createContract(
    address,
    rawProvider,
    AllowedContractRegistry,
  )

  return {
    contractInstance,
    contractInterface,

    addAllowedContract: async (byteCode: string) => {
      const bytecodeHash = ethers.utils.keccak256(byteCode)
      const data = contractInterface.encodeFunctionData('addAllowedContract', [bytecodeHash])
      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    toggleDeployedFlag: async (byteCode: string) => {
      const bytecodeHash = ethers.utils.keccak256(byteCode)
      const data = contractInterface.encodeFunctionData('toggleDeployedFlag', [bytecodeHash])
      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    isAllowedToDeploy: async (byteCode: string) => {
      return contractInstance?.isAllowedToDeploy(byteCode)
    },

    isDeployed: async (byteCode: string) => {
      return contractInstance?.isDeployed(byteCode)
    },
  }
}
