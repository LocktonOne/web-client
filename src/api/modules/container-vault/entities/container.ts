import { Time } from '@distributedlab/tools'
import { isString } from 'lodash-es'

import {
  base64Encode,
  calculateKeys,
  decryptData,
  DeriveIdOpts,
  encryptData,
  FromEncryptedOpts,
  KdfParams,
  randomBytes,
} from '@/api/modules/container-vault'

export type Credential = {
  provider: string
  credential: string
}

export class Container {
  public email: string
  public data: Credential[] | string
  public id?: string

  constructor(email: string, data: Credential[] | string, containerId?: string) {
    if (containerId && !isString(containerId)) {
      throw new Error('Hex encoded wallet ID expected.')
    }

    this.email = email
    this.data = data
    this.id = containerId
  }

  setId(id: string) {
    this.id = id
  }

  setData(data: Credential[] | string) {
    this.data = data
  }

  get getEmail() {
    return this.email
  }

  get getData() {
    return this.data
  }

  get getId() {
    return this.id
  }

  static generate(email: string) {
    return new Container(email, '')
  }

  static async deriveId(opts: DeriveIdOpts) {
    const keyPair = await calculateKeys(opts.salt, opts.email, opts.password, opts.kdfParams)

    return keyPair.getPublic('hex')
  }

  static async deriveSecretKey(opts: DeriveIdOpts) {
    const keyPair = await calculateKeys(opts.salt, opts.email, opts.password, opts.kdfParams)

    return keyPair.getSecret('hex')
  }

  static async fromEncrypted(opts: FromEncryptedOpts) {
    const keyPair = await calculateKeys(opts.salt, opts.email, opts.password, opts.kdfParams)

    const rawContainerId = keyPair.getPublic('hex')
    const rawContainerKey = keyPair.getSecret('hex')
    const decryptedContainerData = JSON.parse(decryptData(opts.containerData, rawContainerKey))

    return new Container(opts.email, decryptedContainerData, rawContainerId)
  }

  static async encrypt(
    kdfParams: KdfParams,
    email: string,
    password: string,
    data?: Credential[] | string,
  ) {
    if (!isString(password) || password.length === 0) {
      throw new TypeError('Password must be a non-empty string')
    }

    const salt = randomBytes(4).toString('ascii')
    const keyPair = await calculateKeys(salt, email, password, kdfParams)

    const containerData = encryptData(JSON.stringify(data), keyPair.getSecret('hex'))

    const saltInBase64 = base64Encode(salt)

    return {
      id: keyPair.getPublic('hex'),
      email,
      saltInBase64,
      keyPair,
      containerData,
      timestamp: new Time().timestamp,
    }
  }
}
