import { api } from '@/api/clients'

type IdentityResponse = {
  type: string
  id: string
}

export const createIdentity = async (): Promise<void> => {
  await api.post('/integrations/polygonid-issuer-integration/identities', {
    body: {
      data: {
        attributes: {
          method: 'polygonid',
          blockchain: 'polygon',
          network: 'mumbai',
          type: 'BJJ',
        },
      },
    },
  })
}

export const getIdentity = async (address: string): Promise<string> => {
  const { rawData } = await api.get<IdentityResponse>(
    `/integrations/polygonid-issuer-integration/identities/address/${address}`,
  )
  // FIXME: data is undefien, but rawData have id
  return rawData.id as string
}
