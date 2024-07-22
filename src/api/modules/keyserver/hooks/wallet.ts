import { JsonApiBodyBuilder } from '@distributedlab/jac'
import {
  base64Decode,
  ContainerUpdateResponse,
  getWalletByNonce,
  loadKdfParams,
  Wallet,
  WalletResponse,
} from 'src/api/modules/keyserver'

import { api } from '@/api/clients'
// import { useContainerStore } from '@/store'

export const useWallet = () => {
  const create = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams('')

    const testCredentials = [
      {
        provider: 'google',
        credential: 'GoogleAccessToken123',
      },
      {
        provider: 'email',
        credential: 'example@email.com',
      },
      {
        provider: 'evm',
        credential: 'BlockchainPrivateKey456',
      },
    ]

    const wallet = Wallet.generate(email)
    const encryptedWallet = await Wallet.encrypt(kdfParams, email, password, testCredentials)

    const body = new JsonApiBodyBuilder()
      .setData({
        type: 'wallet',
        attributes: {
          keychain_data: encryptedWallet.keychainData,
          wallet_id: encryptedWallet.id,
          email: encryptedWallet.email,
          salt: encryptedWallet.saltInBase64,
        },
      })
      .build()

    const { data } = await api.post<WalletResponse>('/integrations/keyserver-svc/wallet', {
      body,
    })

    wallet.setId(data.wallet_id)
    wallet.setData(data.keychain_data)

    return wallet
  }

  const login = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams(email)

    const walletId = await Wallet.deriveId({
      email,
      password,
      kdfParams,
      salt: base64Decode(kdfParams.salt),
    })

    const decryptedWallet = await getWalletByNonce(walletId)

    return Wallet.fromEncrypted({
      decryptedKeychainData: decryptedWallet.keychain_data,
      kdfParams,
      salt: base64Decode(kdfParams.salt),
      email,
      password,
    })
  }

  const updatePassword = async (email: string, password: string, newPassword: string) => {
    const { data: kdfParams } = await loadKdfParams(email)

    const oldContainer = await login(email, password)

    const encryptedNewContainer = await Wallet.encrypt(
      kdfParams,
      email,
      newPassword,
      oldContainer.data,
    )

    const body = new JsonApiBodyBuilder()
      .setData({
        type: 'wallet',
        attributes: {
          wallet_id: encryptedNewContainer.id,
          email: email,
          old_password: password,
          keychain_data: encryptedNewContainer.keychainData,
        },
      })
      .build()

    await api.patch<ContainerUpdateResponse>('/integrations/keyserver-svc/container', {
      body,
    })

    return new Wallet(email, encryptedNewContainer.keychainData, encryptedNewContainer.id)
  }

  // const recoveryAccount = async (email: string, token: string) => {
  // const containerStore = useContainerStore()

  // const body = new JsonApiBodyBuilder()
  //   .setData({
  //     type: 'container',
  //     attributes: {
  //       container_id: containerStore.container?.id,
  //       container_data: containerStore.container?.data,
  //       email: email,
  //       token: token,
  //     },
  //   })
  //   .build()
  // await api.patch('/integrations/container-vault-svc/container/recovery', {
  //   body,
  // })
  //
  // return new Container('', '', '')
  // }

  return {
    create,
    login,
    updatePassword,
    // recoveryAccount,
  }
}
