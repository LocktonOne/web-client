import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'
//eslint-disable-next-line
import { isExpired } from 'react-jwt'

import {
  getAuthNonce,
  login as toolkitLogin,
  refreshToken as toolkitRefreshToken,
} from '@/api/modules'
import { sleep } from '@/helpers'
import { useWeb3State, web3Store } from '@/store'
import { authStore, useAuthState } from '@/store/modules/auth.module'

export const useAdminAuth = () => {
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

  const authorize = async (providerType: PROVIDERS) => {
    await web3Store.connect(providerType)

    if (!web3Store.provider?.address) {
      await sleep(1000)
    }

    if (!web3Store.provider?.address) {
      throw new Error('Provider address is undefined')
    }
    const authNonce = await getAuthNonce(web3Store.provider.address)
    const signedMessage = await web3Store.provider.signMessage(authNonce)
    await login(web3Store.provider.address, signedMessage!)
  }

  return {
    isAuthorized,
    login,
    logout,
    refreshToken,
    authorize,
  }
}
