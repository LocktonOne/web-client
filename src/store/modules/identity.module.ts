import {
  Chain,
  CHAIN_TYPES,
  ChainId,
  EthTransactionResponse,
  getEthExplorerAddressUrl,
  getEthExplorerTxUrl,
  hexToDecimal,
  PROVIDER_EVENT_BUS_EVENTS,
  PROVIDER_EVENTS,
  ProviderEventBus,
  ProviderProxy,
  PROVIDERS,
  RawProvider,
  SolanaTransactionResponse,
  TransactionResponse,
  TxRequestBody,
} from '@distributedlab/w3p'
import type { TransactionRequest } from '@ethersproject/abstract-provider'
import type { Deferrable } from '@ethersproject/properties'
import { providers, Wallet } from 'ethers'

import { createStore } from '@/helpers'

type AuthState = {
  privateKey: string
}

const [identityStore, useIdentityState] = createStore(
  'identity',
  {
    privateKey: '',
  } as AuthState,
  () => ({}),
  state => ({
    setPrivateKey: (privateKey: string) => {
      state.privateKey = privateKey
    },
    getIdentityWeb3Wallet: (privateKey: string) => {
      const wallet = new Wallet(
        privateKey,
        new providers.JsonRpcProvider('http://localhost:8554', {
          name: 'Loct',
          chainId: 9,
        }),
      )

      return wallet
    },

    clear: () => {
      state.privateKey = ''
    },
  }),
  { persistProperties: ['privateKey'] },
)

export { identityStore, useIdentityState }

export class WalletProvider extends ProviderEventBus implements ProviderProxy {
  readonly wallet: Wallet
  rawProvider: RawProvider
  nullifier: string

  chainId?: ChainId
  address?: string

  constructor(provider: RawProvider) {
    super()

    const { wallet, nullifier } = provider as unknown as {
      wallet: Wallet
      nullifier: string
    }

    this.wallet = wallet
    this.nullifier = nullifier

    this.rawProvider = wallet.provider as unknown as RawProvider
  }

  get chainType(): CHAIN_TYPES {
    return CHAIN_TYPES.EVM
  }

  get isConnected(): boolean {
    return Boolean(this.chainId && this.address)
  }

  get defaultEventPayload() {
    return {
      address: this.address,
      chainId: this.chainId,
      isConnected: this.isConnected,
    }
  }

  async init(): Promise<void> {
    await this.setListeners()
    const network = await this.wallet.provider.getNetwork()
    this.address = this.wallet.address

    this.chainId = hexToDecimal(network.chainId as ChainId)

    this.emit(PROVIDER_EVENT_BUS_EVENTS.Initiated, this.defaultEventPayload)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async switchChain(chainId: ChainId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addChain(chain: Chain): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {
    identityStore.clear()
  }

  getAddressUrl(chain: Chain, address: string): string {
    return getEthExplorerAddressUrl(chain, address)
  }

  getTxUrl(chain: Chain, txHash: string): string {
    return getEthExplorerTxUrl(chain, txHash)
  }

  getHashFromTx(txResponse: TransactionResponse): string {
    return (txResponse as EthTransactionResponse).transactionHash as SolanaTransactionResponse
  }

  async signAndSendTx(tx: TxRequestBody): Promise<TransactionResponse> {
    this.emit(PROVIDER_EVENT_BUS_EVENTS.BeforeTxSent, {
      txBody: tx,
    })
    const transactionResponse = await this.wallet.sendTransaction(
      tx as Deferrable<TransactionRequest>,
    )

    this.emit(PROVIDER_EVENT_BUS_EVENTS.TxSent, {
      txHash: transactionResponse.hash,
    })

    const receipt = await transactionResponse.wait()

    this.emit(PROVIDER_EVENT_BUS_EVENTS.TxConfirmed, {
      txResponse: receipt,
    })

    return receipt
  }

  async signMessage(message: string): Promise<string> {
    return this.wallet.signMessage(message)
  }

  async setListeners() {
    const stubProvider = this.wallet.provider as providers.BaseProvider

    stubProvider.on(PROVIDER_EVENTS.AccountsChanged, async () => {
      this.address = this.wallet.address

      this.emit(PROVIDER_EVENT_BUS_EVENTS.AccountChanged, this.defaultEventPayload)
      this.emit(
        this.isConnected ? PROVIDER_EVENT_BUS_EVENTS.Connect : PROVIDER_EVENT_BUS_EVENTS.Disconnect,
        this.defaultEventPayload,
      )
    })

    stubProvider.on(PROVIDER_EVENTS.ChainChanged, (chainId: ChainId) => {
      this.chainId = hexToDecimal(chainId)

      this.emit(PROVIDER_EVENT_BUS_EVENTS.ChainChanged, this.defaultEventPayload)
    })
  }

  static get providerType(): PROVIDERS {
    return 'wallet' as PROVIDERS
  }
}
