import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { getAuthPair, refreshToken } from '@/api/modules/doorman'
import { useWalletState, walletStore, web3Store } from '@/store'
import { authStore } from '@/store/modules/auth.module'

export const useAuth = () => {
  const { wallet } = useWalletState()
  const _wallet = useWallet()

  const isLoggedIn = useMemo(() => {
    return Boolean(wallet)
  }, [wallet])

  const logout = useCallback(async () => {
    walletStore.setWallet(null)
  }, [])

  const login = async (email: string, password: string) => {
    const generatedWallet = await _wallet.login(email, password)
    if (!web3Store.provider?.address) {
      await web3Store.connect(PROVIDERS.Metamask)
    }
    const tokens = await getAuthPair(web3Store.provider?.address ?? '')
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    walletStore.setWallet(generatedWallet)
  }

  const register = async (email: string, password: string) => {
    const generatedWallet = await _wallet.create(email, password)
    if (!web3Store.provider?.address) {
      await web3Store.connect(PROVIDERS.Metamask)
    }
    const tokens = await getAuthPair(web3Store.provider?.address ?? '')
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    walletStore.setWallet(generatedWallet)
  }

  const getAccessToken = () => authStore.tokens.accessToken

  const refreshAccessToken = async () => {
    const tokens = await refreshToken()
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
  }

  return {
    isLoggedIn,
    login,
    logout,
    register,
    getAccessToken,
    refreshAccessToken,
  }
}
