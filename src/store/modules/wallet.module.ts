import { createStore } from '@/helpers'

type WalletState = {
  walletId: string | null
  metamaskAddress: string | null
}

const [walletStore, useWalletState] = createStore(
  'wallet',
  {
    walletId: null,
  } as WalletState,
  () => ({}),
  state => ({
    setWalletId(walletId: string | null) {
      state.walletId = walletId
    },
    setMetamaskAddress: (address: string | null) => {
      state.metamaskAddress = address
    },
  }),
)

export { useWalletState, walletStore }
