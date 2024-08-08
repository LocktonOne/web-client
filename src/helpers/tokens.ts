import { coreContracts } from '@/modules/sdk'
import { TokenInfo } from '@/types'

export const getTokens = async () => {
  const tokenFactory = coreContracts.getTokenFactoryContract()
  const deployedTokens = await tokenFactory.getDeployedTokens()
  const _tokenList: TokenInfo[] = []
  for (const token of deployedTokens) {
    const tokenInfo = await tokenFactory.getTokenInfo(token)
    _tokenList.push(tokenInfo)
  }
  return _tokenList
}
