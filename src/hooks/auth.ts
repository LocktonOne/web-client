import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { getAuthPair, refreshToken } from '@/api/modules/doorman'
import { Roles } from '@/enums'
import { sleep } from '@/helpers'
import { coreContracts, initCoreContracts } from "@/modules/sdk";
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
    await getRoles()
    const tokens = await getAuthPair(web3Store.provider?.address ?? '')
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    walletStore.setWallet(generatedWallet)
  }

  const loginWithMetamask = async () => {
    await web3Store.connect(PROVIDERS.Metamask)

    if (!web3Store.provider?.address) {
      await sleep(1000)
    }

    if (!web3Store.provider?.address) {
      throw new Error('Provider address is undefined')
    }

    const tokens = await getAuthPair(web3Store.provider?.address ?? '')
    await initCoreContracts(web3Store.provider, web3Store.provider.rawProvider!)
    await coreContracts.loadCoreContractsAddresses()
    await getRoles()
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    walletStore.setWallet(web3Store.provider.address)
  }

  const register = async (email: string, password: string) => {
    const generatedWallet = await _wallet.create(email, password)
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
    loginWithMetamask,
    getAccessToken,
    refreshAccessToken,
  }
}
