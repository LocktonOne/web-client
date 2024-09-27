import {
  type ChainId,
  CoinbaseProvider,
  createProvider,
  errors,
  MetamaskProvider,
  Provider,
  ProviderDetector,
  ProviderProxyConstructor,
  PROVIDERS,
  RawProvider,
} from '@distributedlab/w3p'
import { ref } from 'valtio'

import { createStore, sleep } from '@/helpers'
import { identityStore, WalletProvider } from '@/store/modules'

export type SupportedProviders = PROVIDERS | 'wallet'

type Web3Store = {
  provider: Provider
  providerDetector: ProviderDetector<SupportedProviders> | undefined
  providerType: SupportedProviders | undefined
  providerChainId: ChainId | undefined
  balance: string
}

const providerDetector = new ProviderDetector<SupportedProviders>()

const PROVIDERS_PROXIES: { [key in SupportedProviders]?: ProviderProxyConstructor } = {
  [PROVIDERS.Metamask]: MetamaskProvider,
  [PROVIDERS.Coinbase]: CoinbaseProvider,
  ['wallet']: WalletProvider,
}

export const [web3Store, useWeb3State] = createStore(
  'web3',
  {
    provider: {} as Provider,
    providerDetector: undefined,
    providerType: undefined,
    providerChainId: undefined,
    balance: '0',
  } as Web3Store,
  state => ({
    get isConnected(): boolean {
      return Boolean(state.provider?.isConnected)
    },

    get address(): string | undefined {
      return state.provider?.address
    },
  }),
  state => ({
    init: async (_providerType?: SupportedProviders) => {
      let providerType = _providerType
      if (!providerType) {
        providerType = state.providerType
      }

      if (!providerType || !(providerType in PROVIDERS_PROXIES))
        throw new TypeError('Provider not supported')

      if (
        providerType === 'wallet' &&
        !providerDetector.providers['wallet'] &&
        identityStore.privateKey
      ) {
        providerDetector.addProvider({
          name: 'wallet',
          instance: {
            wallet: identityStore.getIdentityWeb3Wallet(identityStore.privateKey),
          } as unknown as RawProvider,
        })
      }

      const providerProxy = PROVIDERS_PROXIES[providerType]!

      state.provider?.clearHandlers?.()

      state.providerDetector = ref(providerDetector)

      /**
       * because of proxy aint works with private fields in objects, we should use `valtio ref`,
       * and to keep valtio proxy "rolling" - we should update state ref property,
       * e.g. onAccountChanged or onChainChanged, ...etc
       */
      const initiatedProvider = await createProvider(providerProxy, {
        providerDetector,
        listeners: {
          onChainChanged: e => {
            state.providerChainId = e?.chainId
            web3Store.init(providerType)
          },
          onAccountChanged: e => {
            // HOTFIX: double check if user disconnected from wallet
            if (!e?.address) {
              web3Store.disconnect()

              return
            }

            web3Store.init(providerType)
          },
          onDisconnect: () => {
            web3Store.disconnect()
          },
        },
      })

      // TODO: fix global rerenders

      state.provider = ref(initiatedProvider)

      state.providerType = providerType
      state.providerChainId = initiatedProvider.chainId

      await state.provider.connect()

      // hotfix injected provider listeners updating provider proxy object
      await sleep(300)
    },

    setBalance(balance: string) {
      state.balance = balance
    },

    safeSwitchNetwork: async (chainId: ChainId) => {
      if (!state.provider?.address) {
        return
      }

      try {
        await web3Store.provider?.switchChain(chainId)
      } catch (error) {
        if (
          error instanceof errors.ProviderInternalError ||
          error instanceof errors.ProviderChainNotFoundError
        ) {
          const chainDetails = Provider.chainsDetails?.[chainId]

          if (!chainDetails) {
            throw error
          }

          await web3Store.provider?.addChain(chainDetails)

          return
        }

        throw error
      }
    },

    disconnect: async () => {
      await state.provider?.disconnect()
      if (
        state.provider.providerType === ('wallet' as PROVIDERS) &&
        providerDetector.providers['wallet']
      ) {
        providerDetector.removeProvider({ name: 'wallet' })
      }

      state.providerType = undefined
      state.provider = {} as Provider
    },

    // FIXME
    getNetworkConfig: () => {
      const networkName = state.provider?.chainId

      return networkName
    },
  }),
  {
    persistProperties: ['providerType', 'providerChainId'],
  },
)
