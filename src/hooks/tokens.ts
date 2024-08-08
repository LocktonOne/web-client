import { useState } from 'react'

import { getTokens } from '@/helpers'
import { TokenInfo } from '@/types'

export const useTokens = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tokensList, setTokensList] = useState<TokenInfo[]>([])

  const loadTokens = async () => {
    setIsLoading(true)
    setTokensList(await getTokens())
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
