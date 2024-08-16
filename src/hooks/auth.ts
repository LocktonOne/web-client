import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { getAuthPair, refreshToken } from '@/api/modules/doorman'
import { Roles } from '@/enums'
import { coreContracts } from '@/modules/sdk'
import { rolesStore, useRolesState, useWalletState, walletStore, web3Store } from '@/store'
import { authStore } from '@/store/modules/auth.module'

export const useAuth = () => {
  const { wallet } = useWalletState()
  const _wallet = useWallet()
  const { roles } = useRolesState()

  const isLoggedIn = useMemo(() => {
    return Boolean(wallet)
  }, [wallet])

  const role = useMemo(() => {
    switch (true) {
      case roles.includes(Roles.CORPORATE): {
        return Roles.CORPORATE
      }
      case roles.includes(Roles.VERIFIED): {
        return Roles.VERIFIED
      }
      default:
        return Roles.UNVERIFIED
    }
  }, [roles])

  const logout = useCallback(async () => {
    walletStore.setWallet(null)
  }, [])

  const login = async (email: string, password: string) => {
    const generatedWallet = await _wallet.login(email, password)
    if (!web3Store.provider?.address) {
      await web3Store.connect(PROVIDERS.Metamask)
    }
    await getRoles()
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
    await getRoles()
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    walletStore.setWallet(generatedWallet)
  }

  const getAccessToken = () => authStore.tokens.accessToken

  const refreshAccessToken = async () => {
    const tokens = await refreshToken()
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
  }

  const getRoles = async () => {
    const MasterAccessManagementContract = coreContracts.getMasterAccessManagementContract()
    const roles = await MasterAccessManagementContract.getUserRoles(coreContracts.provider.address!)
    rolesStore.addRoles(roles)
  }

  return {
    isLoggedIn,
    role,

    login,
    logout,
    register,
    getAccessToken,
    refreshAccessToken,
  }
}
