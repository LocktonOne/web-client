import { api } from '@/api/clients'

const DEFAULT_AMOUNT_TOKENS_FOR_NEW_USERS = 1

export const getToken = async (address: string, amount?: string): Promise<void> => {
  await api.post('/integrations/faucet', {
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
}
