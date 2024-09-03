import { Wallet } from '@/api/modules/keyserver'
import { createStore } from '@/helpers'

export type AuthTokensGroup = {
  id: string
  type: 'token'
  accessToken: string
  refreshToken: string
}

type WalletState = {
  wallet: Wallet | null
  metamaskAddress: string | null
}

const [walletStore, useWalletState] = createStore(
  'wallet',
  {
    wallet: null,
  } as WalletState,
  state => ({
    setWallet(wallet: Wallet | null) {
      state.wallet = wallet
    },
    setMetamaskAddress: (address: string | null) => {
      state.metamaskAddress = address
    },
  }),
)

export { useWalletState, walletStore }
