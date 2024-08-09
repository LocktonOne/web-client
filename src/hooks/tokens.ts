import { useState } from 'react'

import { coreContracts } from '@/modules/sdk'
import { TokenInfo } from '@/types'

export const useTokens = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tokensList, setTokensList] = useState<TokenInfo[]>([])

  const loadTokens = async () => {
    setIsLoading(true)

    const tokenFactory = coreContracts.getTokenFactoryContract()
    const deployedTokens = await tokenFactory.getDeployedTokens()
    const _tokenList: TokenInfo[] = []
    for (const token of deployedTokens) {
      const tokenInfo = await tokenFactory.getTokenInfo(token)
      _tokenList.push({ ...tokenInfo, address: token })
    }

    setTokensList(_tokenList)
    setIsLoading(false)
  }

  return {
    tokensList,
    isLoading,
    loadTokens,
    setTokensList,
    setIsLoading,
  }
}
