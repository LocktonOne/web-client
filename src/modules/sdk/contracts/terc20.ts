import { Provider, RawProvider } from '@distributedlab/w3p'
import { BigNumberish } from 'ethers'

import { coreContracts, createContract, TERC20__factory as TERC20Factory } from '@/modules/sdk'

export const createTERC20Factory = (
  contractAddress: string,
  rawProvider: RawProvider,
  provider: Provider,
) => {
  const { contractInstance, contractInterface } = createContract(
    contractAddress,
    rawProvider,
    TERC20Factory,
  )

  return {
    contractInstance,
    contractInterface,

    mintToken: async (amount: BigNumberish) => {
      const data = contractInterface.encodeFunctionData('mintTo', [
        coreContracts.provider.address!,
        amount,
      ])

      return provider.signAndSendTx({
        to: contractAddress,
        data,
      })
    },
  }
}
