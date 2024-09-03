import { api } from '@/api/clients'

const DEFAULT_AMOUNT_TOKENS_FOR_NEW_USERS = 1

type getTokenResponse = { id: string; type: string; tx_hash: string }

export const getToken = async (address: string, amount?: string): Promise<string> => {
  const { data } = await api.post<getTokenResponse>('/integrations/faucet', {
    body: {
      data: {
        type: 'faucet',
        attributes: {
          recipient: {
            address: address,
            amount: amount ?? DEFAULT_AMOUNT_TOKENS_FOR_NEW_USERS,
          },
        },
      },
    },
  })
  return data.tx_hash
}
