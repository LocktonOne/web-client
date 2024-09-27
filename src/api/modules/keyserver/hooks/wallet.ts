import { JsonApiBodyBuilder } from '@distributedlab/jac'
import { getWalletByNonce, loadKdfParams, Wallet, WalletResponse } from 'src/api/modules/keyserver'

import { api } from '@/api/clients'

export const useWallet = () => {
  const create = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams('')

    const wallet = Wallet.generate(email)
    const encryptedWallet = wallet.encrypt(kdfParams, password)

    const body = new JsonApiBodyBuilder()
      .setData({
        type: 'wallet',
        attributes: {
          keychain_data: encryptedWallet.keychainData,
          wallet_id: encryptedWallet.id,
          email: encryptedWallet.email,
          salt: encryptedWallet.salt,
        },
      })
      .build()

    await api.post<WalletResponse>('/integrations/keyserver-svc/wallet', {
      body,
    })

    return wallet
  }

  const login = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams(email)

    const walletId = Wallet.deriveId(email, password, kdfParams, kdfParams.salt)

    const decryptedWallet = await getWalletByNonce(walletId)

    return Wallet.fromEncrypted({
      keychainData: decryptedWallet.keychain_data,
      kdfParams,
      salt: kdfParams.salt,
      email,
      password,
    })
  }

  return {
    create,
    login,
  }
}
