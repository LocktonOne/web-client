import { Provider, RawProvider } from '@distributedlab/w3p'
import { BigNumberish, ethers } from 'ethers'

import {
  coreContracts,
  createContract,
  TERC20__factory as TERC20Factory,
  TokenFactory__factory as TokenFactory,
} from '@/modules/sdk'

type ConstructorParamsStruct = {
  name: string
  symbol: string
  contractURI: string
  decimals: BigNumberish
  totalSupplyCap: BigNumberish
  permissions: BigNumberish
}

export const createTokenFactory = (
  address: string,
  rawProvider: RawProvider,
  provider: Provider,
) => {
  const { contractInstance, contractInterface } = createContract(address, rawProvider, TokenFactory)

  return {
    contractInstance,
    contractInterface,

    requestTERC20: async (params: ConstructorParamsStruct, description: string) => {
      const data = contractInterface.encodeFunctionData('requestTERC20', [params, description])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: 250000,
      })
    },

    deployTERC20: async (params: ConstructorParamsStruct) => {
      const data = contractInterface.encodeFunctionData('deployTERC20', [params])
      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: 1500000,
      })
    },

    getDeployedTokens: async () => {
      return contractInstance.getDeployedTokens()
    },

    countTokens: async () => {
      return contractInstance.countTokens()
    },

    isTokenExist: async (token: string) => {
      return contractInstance.isTokenExist(token)
    },

    listTokens: async (offset: BigNumberish, limit: BigNumberish) => {
      return contractInstance.listTokens(offset, limit)
    },

    getTokenInfo: async (tokenAddress: string) => {
      const { contractInstance } = createContract(
        tokenAddress,
        coreContracts.rawProvider,
        TERC20Factory,
      )

      const name = await contractInstance.name()
      const symbol = await contractInstance.symbol()
      const decimals = await contractInstance.decimals()
      const totalSupply = await contractInstance.totalSupply()
      const totalSupplyCap = await contractInstance.totalSupplyCap()
      const permissions = await contractInstance.getTokenPermissions()

      return {
        name,
        symbol,
        decimals,
        totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
        totalSupplyCap: ethers.utils.formatUnits(totalSupplyCap, decimals),
        permissions,
      }
    },

    getTokenBalance: async (tokenAddress: string, account: string) => {
      const { contractInstance } = createContract(
        tokenAddress,
        coreContracts.rawProvider,
        TERC20Factory,
      )
      const balance = await contractInstance.balanceOf(account)
      const decimals = await contractInstance.decimals()
      return ethers.utils.formatUnits(balance, decimals)
    },
  }
}
