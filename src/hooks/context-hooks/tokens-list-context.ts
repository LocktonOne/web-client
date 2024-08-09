import { useContext } from 'react'

import { tokensListContext } from '@/contexts'

export const useTokensListContext = () => useContext(tokensListContext)
