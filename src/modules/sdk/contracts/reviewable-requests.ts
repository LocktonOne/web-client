import { Provider, RawProvider } from '@distributedlab/w3p'
import { BigNumberish, BytesLike } from 'ethers'

import { createContract } from '../helpers'
import { ReviewableRequests__factory as ReviewableRequests } from '../types'

export const createReviewableRequests = (
  address: string,
  rawProvider: RawProvider,
  provider: Provider,
) => {
  const { contractInstance, contractInterface } = createContract(
    address,
    rawProvider,
    ReviewableRequests,
  )

  return {
    contractInstance,
    contractInterface,

    acceptRequest: async (requestId: string) => {
      const data = contractInterface.encodeFunctionData('acceptRequest', [requestId])

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    createRequest: async (
      executor: string,
      acceptData: BytesLike,
      rejectData: BytesLike,
      misc: string,
      description: string,
    ) => {
      const data = contractInterface.encodeFunctionData('createRequest', [
        executor,
        acceptData,
        rejectData,
        misc,
        description,
      ])

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    dropRequest: async (requestId: BigNumberish) => {
      const data = contractInterface.encodeFunctionData('dropRequest', [requestId])

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    rejectRequest: async (requestId: BigNumberish, reason: string) => {
      const data = contractInterface.encodeFunctionData('rejectRequest', [requestId, reason])

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },

    updateRequest: async (
      requestId: BigNumberish,
      executor: string,
      acceptData: BytesLike,
      rejectData: BytesLike,
      misc: string,
      description: string,
    ) => {
      const data = contractInterface.encodeFunctionData('updateRequest', [
        requestId,
        executor,
        acceptData,
        rejectData,
        misc,
        description,
      ])

      return provider.signAndSendTx({
        to: address,
        data,
      })
    },
  }
}
