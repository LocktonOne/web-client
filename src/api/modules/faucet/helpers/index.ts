import { api } from '@/api/clients'

export const getToken = async (address: string, amount?: string): Promise<void> => {
  await api.post('/integrations/faucet', {
    body: {
      data: {
        type: 'faucet',
        attributes: {
          recipient: {
            address: address,
            amount: amount ?? 1,
          },
        },
      },
    },
  })
}
