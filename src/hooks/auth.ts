import { EthereumProvider, PROVIDERS } from '@distributedlab/w3p'
import { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'

import { useWallet } from '@/api/modules'
import { getAuthPair, refreshToken } from '@/api/modules/doorman'
import { getToken } from '@/api/modules/faucet'
import { Roles } from '@/enums'
import { sleep } from '@/helpers'
import { coreContracts, initCoreContracts } from '@/modules/sdk'
import { rolesStore, useRolesState, useWalletState, walletStore, web3Store } from '@/store'
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
    authStore.addTokensGroup({ id: '', type: 'token', refreshToken: '', accessToken: '' })
  }, [])

  const getTokenForKYC = async (addr: string) => {
    const provider = new ethers.providers.Web3Provider(
      web3Store.provider?.rawProvider as EthereumProvider,
    )
    const balance = await provider.getBalance(addr)
    if (balance.lte(0)) {
      const txHash = await getToken(addr)
      const tx = await provider.getTransaction(txHash)
      await tx.wait()
    }
  }

  const login = async (email: string, password: string) => {
    const generatedWallet = await _wallet.login(email, password)
    console.log(generatedWallet)
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8554', {
      chainId: 9,
      name: 'Loctone dev 8554',
    })
    // fab20be82b2e8a643de937f96d7ca1170b30a9ba78bce45649199984571e9474
    const privateKey =
      '11f32b741bab3255b4fe81f0dc7442028a7317f30d353576ce1e5728eca48dcee5dfcbd330e5eea271b51602d5cf0320d6e86489e160517dec60893078182ea1f564b765ab62b8dda53b26ae0cc3ce40806ff6c7eb28c9b162e7938874c447cdaa08eb0fe59422640bd8a28df726dd3ff41b894b04819ba2e6b5de02ad626afbffd6952caefa88523bb7ff33869a292d12ea93f25e67b51080b5117603f2829bc54e34cd0518549645e9075371fc392e99c15fd1b6ac7b1f35941a747b2c08c1563214dc0e2b225e8b731ff88b85a9028ca568d4f60e0e73263243b2ce9025139dc300bd8efd847a690fbe7e47a3fd15d05bb768615820365ed937955cd5ada6' // Вставь свой приватный ключ здесь
    const wallet = new ethers.Wallet(privateKey, provider)
    return console.log(wallet, 'walet')
    // await getRoles()
    return
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
    authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
    await getRoles()
    await getTokenForKYC(web3Store.provider.address)
    walletStore.setMetamaskAddress(web3Store.provider.address)
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
    getRoles,
    loginWithMetamask,
    getAccessToken,
    refreshAccessToken,
  }
}
