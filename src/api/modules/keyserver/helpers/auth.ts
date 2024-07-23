import { WalletResponse } from 'src/api/modules/keyserver'

import { api } from '@/api/clients'

export const getWalletByNonce = async (walletId: string) => {
  const { data } = await api.get<WalletResponse>(`/integrations/keyserver-svc/wallet/${walletId}`)
  return data
}
