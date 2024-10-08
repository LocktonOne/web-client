import { api } from '@/api/clients'

export const requestWalletVerification = async (walletId: string) => {
  await api.post(`/integrations/keyserver-svc/wallet/${walletId}/verification`)
}

export const verifyEmail = async (walletId: string, code: string) => {
  await api.put(`/integrations/keyserver-svc/wallet/${walletId}/verification`, {
    body: {
      data: {
        type: 'wallet_verification',
        attributes: {
          token: code,
        },
      },
    },
  })
}
