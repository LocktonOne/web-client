import { useCallback, useMemo } from 'react'
//eslint-disable-next-line
import { isExpired } from 'react-jwt'

import { login as toolkitLogin, refreshToken as toolkitRefreshToken } from '@/api/modules'
import { useWeb3State } from '@/store'
import { authStore, useAuthState } from '@/store/modules/auth.module'

export const useAuth = () => {
  const { provider } = useWeb3State()
  const { tokens } = useAuthState()

  const isAuthorized = useMemo(() => {
    if (!tokens.accessToken) return false

    return !isExpired(tokens.accessToken)
  }, [tokens.accessToken])

  const logout = useCallback(async () => {
    authStore.addTokensGroup({ id: '', type: 'token', refreshToken: '', accessToken: '' })

    provider?.disconnect()
  }, [provider])

  const login = useCallback(async (accountAddress: string, signedMessage: string) => {
    const { accessToken, refreshToken } = await toolkitLogin(accountAddress, signedMessage)
    authStore.addTokensGroup({
      id: '',
      type: 'token',
      refreshToken: refreshToken.id,
      accessToken: accessToken.id,
    })
  }, [])

  const refreshToken = async () => {
    const { accessToken, refreshToken } = await toolkitRefreshToken(authStore.tokens.refreshToken)

    authStore.addTokensGroup({
      id: '',
      type: 'token',
      refreshToken: refreshToken.id,
      accessToken: accessToken.id,
    })
  }

  return {
    isAuthorized,
    login,
    logout,
    refreshToken,
  }
}
