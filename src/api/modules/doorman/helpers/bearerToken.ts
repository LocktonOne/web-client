import { api } from '@/api/clients'

import { AuthPairResponse } from '../types'
export const getAuthPair = async (
  providerAddress: string,
): Promise<{
  accessToken: string
  refreshToken: string
}> => {
  const { data } = await api.post<AuthPairResponse>('/integrations/doorman/get_token_pair', {
    body: {
      type: 'generate-pair',
      attributes: {
        purpose: {
          type: 'session',
        },
        eth_address: providerAddress,
      },
    },
  })

  return {
    accessToken: data.access_token.id,
    refreshToken: data.refresh_token.id,
  }
}

export const refreshToken = async (): Promise<{
  accessToken: string
  refreshToken: string
}> => {
  const { data } = await api.get<AuthPairResponse>('/integrations/doorman/refresh_token')

  return {
    accessToken: data.access_token.id,
    refreshToken: data.refresh_token.id,
  }
}
