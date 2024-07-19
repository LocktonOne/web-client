import { api } from '@/api/clients'
import { KdfParams } from '@/api/modules/container-vault'

export const loadKdfParams = async (email: string) => {
  return api.get<KdfParams>('/integrations/container-vault-svc/kdf', {
    query: {
      email: email,
    },
  })
}
