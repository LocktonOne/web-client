import { JsonApiBodyBuilder } from '@distributedlab/jac'

import { api } from '@/api/clients'
import { ContainerResponse } from '@/api/modules/container-vault'

// export const getAuthNonce = async (containerId: string) => {
//   const body = new JsonApiBodyBuilder()
//     .setData({
//       type: 'auth_nonce_message',
//       attributes: {
//         container_id: containerId,
//       },
//     })
//     .build()
//   const { data } = await api.post<AuthNonce>('/integrations/container-vault-svc/nonce', { body })
//
//   return data.message.split('\n')[data.message.split('\n').length - 1]
// }

// export const sendRecoveryNonce = async (email: string) => {
//   return api.get('/integrations/container-vault-svc/container/recovery', {
//     query: {
//       email: email,
//     },
//   })
// }

export const getContainerByNonce = async (containerId: string) => {
  const body = new JsonApiBodyBuilder().build()

  const { data } = await api.post<ContainerResponse>(
    `/integrations/container-vault-svc/container/${containerId}`,
    { body },
  )
  return data
}

// export const processAuthError = async (error: unknown) => {
//   const { t } = i18n.global
//   if (!error || !error.constructor) return
//   switch (error.constructor) {
//     case errors.NotFoundError:
//       ErrorHandler.process(error, t('errors.wrong-email-or-password-err'))
//       break
//     case errors.ConflictError:
//       ErrorHandler.process(error, t('errors.user-already-exists-err'))
//       break
//     default:
//       ErrorHandler.process(error)
//   }
// }
