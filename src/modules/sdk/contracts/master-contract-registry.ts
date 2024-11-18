import { RawProvider } from '@distributedlab/w3p'

import { createContract } from '../helpers'
import { MasterContractsRegistry__factory as MasterContractsRegistry } from '../types'

export const createMasterContractsRegistry = (address: string, rawProvider: RawProvider) => {
  const { contractInstance, contractInterface } = createContract(
    address,
    rawProvider,
    MasterContractsRegistry,
  )
  return {
    contractInstance,
    contractInterface,

    getContractAddressByName: async (name: string) => {
      return contractInstance.getContract(name)
    },

    getMasterAccessManagement: async () => {
      console.log("Start getting master access")
      return contractInstance.getMasterAccessManagement()
    },

    getConstantsRegistry: async () => {
      return contractInstance.getConstantsRegistry()
    },

    getReviewableRequests: async () => {
      return contractInstance.getReviewableRequests()
    },
    getTokenFactory: async () => {
      return contractInstance.getContract('TOKEN_FACTORY')
    },
    getAllowedContractRegistry: async () => {
      return contractInstance.getContract('ALLOWED_CONTRACT_REGISTRY')
    },
  }
}
