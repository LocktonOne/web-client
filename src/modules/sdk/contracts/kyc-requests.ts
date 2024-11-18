import { Provider, RawProvider } from '@distributedlab/w3p'

import { createContract } from '../helpers'
import { KYCRequests__factory as KycRequests } from '../types'

export const createKycRequestsContracts = (
  address: string,
  rawProvider: RawProvider,
  provider: Provider,
) => {
  const { contractInstance, contractInterface } = createContract(address, rawProvider, KycRequests)

  return {
    contractInstance,
    contractInterface,

    dropKYCRequest: async () => {
      const data = contractInterface.encodeFunctionData('dropKYCRequest')

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    /**
     * create a request
     * @param storageId storage service entity id
     */
    requestKYC: async (storageId: string) => {
      const data = contractInterface.encodeFunctionData('requestKYC', [storageId])
      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    getUserRequestInfo: async (accountAddress: string) => {
      return contractInstance?.getUserRequestInfo(accountAddress)
    },
  }
}
