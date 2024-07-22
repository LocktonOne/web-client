import { KdfParams } from 'src/api/modules/keyserver'

import { api } from '@/api/clients'

export const loadKdfParams = async (email: string) => {
  return api.get<KdfParams>('/integrations/keyserver-svc/kdf', {
    query: {
      email: email,
    },
  })
}
