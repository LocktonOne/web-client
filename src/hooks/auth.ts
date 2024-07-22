import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { useWalletState, walletStore } from '@/store'

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
    walletStore.setWallet(generatedWallet)
  }

  const register = async (email: string, password: string) => {
    const generatedWallet = await _wallet.create(email, password)
    walletStore.setWallet(generatedWallet)
  }

  return {
    isLoggedIn,
    login,
    logout,
    register,
  }
}
