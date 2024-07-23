import { KdfParams } from './kdf'

export type WalletResponse = {
  keychain_data: string
  wallet_id: string
  email: string
  salt: string
  verified: boolean
}

export type ContainerUpdateResponse = {
  container_id: string
  email: string
  old_password: string
  salt: string
  container_data: string
  last_updated_at: number
  sig: string
}

export type ContainerRecoveryResponce = {
  container_data: string
  container_id: string
  email: string
  token: string
}

export type DeriveIdOpts = {
  email: string
  password: string
  kdfParams: KdfParams
  salt: string
}

export type FromEncryptedOpts = {
  decryptedKeychainData: string
  kdfParams: KdfParams
  salt: string
  email: string
  password: string
}
