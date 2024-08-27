import { Wallet } from '@/api/modules/keyserver'
import { createStore } from '@/helpers'

export type AuthTokensGroup = {
  id: string
  type: 'token'
  accessToken: string
  refreshToken: string
}

type AuthState = {
  wallet: Wallet | string | null
}

const [walletStore, useWalletState] = createStore(
  'wallet',
  {
    wallet: null,
  } as AuthState,
  state => ({
    setWallet(wallet: Wallet | string | null) {
      state.wallet = wallet
    },
  }),
)

export { useWalletState, walletStore }
