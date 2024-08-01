import { JsonApiRecordBase } from '@/api/modules'

type AuthToken = {
  id: string
  type: string
  attributes: {
    expires_in: number
  }
}

export type AuthPairResponse = JsonApiRecordBase<'admin_login'> & {
  refresh_token: AuthToken
  access_token: AuthToken
}
