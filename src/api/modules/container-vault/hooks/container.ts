import { JsonApiBodyBuilder } from '@distributedlab/jac'

import { api } from '@/api/clients'
import {
  base64Decode,
  Container,
  ContainerResponse,
  ContainerUpdateResponse,
  getContainerByNonce,
  loadKdfParams,
} from '@/api/modules/container-vault'
// import { useContainerStore } from '@/store'

export const useContainer = () => {
  const create = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams('')

    const testCredentials = [
      {
        provider: 'google',
        credential: 'GoogleAccessToken123',
      },
      {
        provider: 'email',
        credential: 'example@email.com',
      },
      {
        provider: 'evm',
        credential: 'BlockchainPrivateKey456',
      },
    ]

    const container = Container.generate(email)
    const encryptedContainer = await Container.encrypt(kdfParams, email, password, testCredentials)

    const body = new JsonApiBodyBuilder()
      .setData({
        type: 'container',
        attributes: {
          container_data: encryptedContainer.containerData,
          container_id: encryptedContainer.id,
          email: encryptedContainer.email,
          last_updated_at: encryptedContainer.timestamp,
          salt: encryptedContainer.saltInBase64,
        },
      })
      .build()

    const { data } = await api.post<ContainerResponse>(
      '/integrations/container-vault-svc/container',
      { body },
    )

    container.setId(data.container_id)
    container.setData(data.container_data)

    return container
  }

  const login = async (email: string, password: string) => {
    const { data: kdfParams } = await loadKdfParams(email)

    const containerId = await Container.deriveId({
      email,
      password,
      kdfParams,
      salt: base64Decode(kdfParams.salt),
    })

    const decryptedContainer = await getContainerByNonce(containerId)

    return Container.fromEncrypted({
      containerData: decryptedContainer.container_data,
      kdfParams,
      salt: base64Decode(kdfParams.salt),
      email,
      password,
    })
  }

  const updatePassword = async (email: string, password: string, newPassword: string) => {
    const { data: kdfParams } = await loadKdfParams(email)

    const oldContainer = await login(email, password)

    const encryptedNewContainer = await Container.encrypt(
      kdfParams,
      email,
      newPassword,
      oldContainer.data,
    )

    const body = new JsonApiBodyBuilder()
      .setData({
        type: 'container',
        attributes: {
          container_id: encryptedNewContainer.id,
          email: email,
          old_password: password,
          salt: encryptedNewContainer.saltInBase64,
          container_data: encryptedNewContainer.containerData,
          last_updated_at: encryptedNewContainer.timestamp,
        },
      })
      .build()

    await api.patch<ContainerUpdateResponse>('/integrations/container-vault-svc/container', {
      body,
    })

    return new Container(email, encryptedNewContainer.containerData, encryptedNewContainer.id)
  }

  // const recoveryAccount = async (email: string, token: string) => {
  // const containerStore = useContainerStore()

  // const body = new JsonApiBodyBuilder()
  //   .setData({
  //     type: 'container',
  //     attributes: {
  //       container_id: containerStore.container?.id,
  //       container_data: containerStore.container?.data,
  //       email: email,
  //       token: token,
  //     },
  //   })
  //   .build()
  // await api.patch('/integrations/container-vault-svc/container/recovery', {
  //   body,
  // })
  //
  // return new Container('', '', '')
  // }

  return {
    create,
    login,
    updatePassword,
    // recoveryAccount,
  }
}
