import { createContext, Dispatch, SetStateAction } from 'react'

import { TokenInfo } from '@/types'

type TokensListContextValue = {
  setTokensList: Dispatch<SetStateAction<TokenInfo[]>>
  tokensList: TokenInfo[]
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  loadTokens: () => Promise<void>
}

export const tokensListContext = createContext<TokensListContextValue>({
  tokensList: [],
  isLoading: false,
  setIsLoading: () => {
    throw new ReferenceError(`'setIsLoading' should be used inside <tokensListContext.Provider>`)
  },
  setTokensList: () => {
    throw new ReferenceError(`'setTokensList' should be used inside <tokensListContext.Provider>`)
  },
  loadTokens: async () => {
    throw new ReferenceError(`'loadTokens' should be used inside <tokensListContext.Provider>`)
  },
})
