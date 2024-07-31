import { BN, DECIMALS } from '@distributedlab/tools'
import type { TransactionRequest } from '@ethersproject/abstract-provider'
import type { Deferrable } from '@ethersproject/properties'
import { type providers } from 'ethers'

export async function increaseGasLimit(
  addressFrom: string,
  rawProvider: providers.JsonRpcProvider,
  txBody: Deferrable<TransactionRequest>,
  multiplier: string | number,
) {
  const estimatedGas = await rawProvider.estimateGas({
    ...txBody,
    from: addressFrom,
  })

  return BN.fromRaw(estimatedGas?.toString(), DECIMALS.WEI)
    .mul(BN.fromRaw(multiplier, DECIMALS.WEI))
    .format({
      decimals: 0,
    })
}
