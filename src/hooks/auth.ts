import { PROVIDERS } from '@distributedlab/w3p'
import { providers } from 'ethers'
import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { getAuthPair, refreshToken } from '@/api/modules/doorman'
import { getToken } from '@/api/modules/faucet'
import { Roles } from '@/enums'
import { sleep } from '@/helpers'
import { coreContracts, initCoreContracts } from '@/modules/sdk'
import {
  identityStore,
  rolesStore,
  useRolesState,
  useWalletState,
  walletStore,
  web3Store,
} from '@/store'
import { authStore } from '@/store/modules/auth.module'

export const useAuth = () => {
  const { wallet, metamaskAddress } = useWalletState()
  const _wallet = useWallet()
  const { roles } = useRolesState()

  const isLoggedIn = useMemo(() => {
    return Boolean(wallet) || Boolean(metamaskAddress)
  }, [metamaskAddress, wallet])

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
    walletStore.setMetamaskAddress(null)
    identityStore.clear()
    await web3Store.disconnect()
    authStore.addTokensGroup({ id: '', type: 'token', refreshToken: '', accessToken: '' })
  }, [])

  const getTokenForKYC = async (addr: string) => {
    const providerInstance =
      web3Store.provider.providerType === PROVIDERS.Fallback ||
      web3Store.provider.providerType === ('wallet' as PROVIDERS)
        ? (web3Store.provider.rawProvider as unknown as providers.JsonRpcProvider)
        : new providers.Web3Provider(
            web3Store.provider.rawProvider as providers.ExternalProvider,
            'any',
          )
    const balance = await providerInstance.getBalance(addr)
    if (balance.lte(0)) {
      const txHash = await getToken(addr)
      const tx = await providerInstance.getTransaction(txHash)
      await tx.wait()
    }
  }

  const login = async (email: string, password: string) => {
    const generatedWallet = await _wallet.login(email, password)
    identityStore.setPrivateKey(generatedWallet.keypair.secret())
    await web3Store.init('wallet')
    await initCoreContracts(web3Store.provider, web3Store.provider.rawProvider!)
    await coreContracts.loadCoreContractsAddresses()
    await getRoles()
    walletStore.setWallet(generatedWallet)
    const tokens = await getAuthPair(coreContracts.provider.address ?? '')
    await getTokenForKYC(web3Store.provider.address!)
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
  }

  const loginWithMetamask = async () => {
    await web3Store.init(PROVIDERS.Metamask)

    if (!web3Store.provider?.address) {
      await sleep(1000)
    }

    if (!web3Store.provider?.address) {
      throw new Error('Provider address is undefined')
    }

    const tokens = await getAuthPair(web3Store.provider?.address ?? '')
    await initCoreContracts(web3Store.provider, web3Store.provider.rawProvider!)
    await coreContracts.loadCoreContractsAddresses()
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    await getRoles()
    await getTokenForKYC(web3Store.provider.address)
    walletStore.setMetamaskAddress(web3Store.provider.address)
  }

  const register = async (email: string, password: string) => {
    const generatedWallet = await _wallet.create(email, password)
    identityStore.setPrivateKey(generatedWallet.keypair.secret())
    await web3Store.init('wallet')
    await initCoreContracts(web3Store.provider, web3Store.provider.rawProvider!)
    await coreContracts.loadCoreContractsAddresses()
    await getRoles()
    walletStore.setWallet(generatedWallet)
    const tokens = await getAuthPair(coreContracts.provider.address ?? '')
    await getTokenForKYC(web3Store.provider.address!)
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    await web3Store.init()
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
    getRoles,
    loginWithMetamask,
    getAccessToken,
    refreshAccessToken,
  }
}
