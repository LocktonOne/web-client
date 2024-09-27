import crypto from 'crypto'
import { isString, reduce } from 'lodash'
import sjcl from 'sjcl-tokend'

import { KdfParams } from '@/api/modules'

const ivLength = 96 / 8 // bytes

export function deriveWalletId(masterKey: sjcl.BitArray): sjcl.BitArray {
  return deriveFromKeyFunction('WALLET_ID', masterKey)
}

export function deriveWalletKey(masterKey: sjcl.BitArray): sjcl.BitArray {
  return deriveFromKeyFunction('WALLET_KEY', masterKey)
}

export function deriveSessionKey(sessionKey: sjcl.BitArray): sjcl.BitArray {
  return deriveFromKeyFunction('SESSION_KEY', sessionKey)
}

function deriveFromKeyFunction(token: string, masterKey: sjcl.BitArray): sjcl.BitArray {
  const hmac = new sjcl.misc.hmac(masterKey, sjcl.hash.sha256)
  return hmac.encrypt(token)
}

export function randomBytes(length: number): Buffer {
  const buffer = Buffer.alloc(length)
  crypto.randomFillSync(buffer)
  return buffer
}

export function encryptData(data: string, key: sjcl.BitArray): string {
  if (!isString(data)) {
    throw new TypeError('data must be a String.')
  }

  const cipherName = 'aes'
  const modeName = 'gcm'

  const cipher = new sjcl.cipher[cipherName](key)
  const rawIV = randomBytes(ivLength).toString('hex')
  const encryptedData = sjcl.mode[modeName].encrypt(
    cipher,
    sjcl.codec.utf8String.toBits(data),
    sjcl.codec.base64.toBits(rawIV),
  )

  const result = JSON.stringify({
    IV: rawIV,
    cipherText: sjcl.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName,
  })

  return base64Encode(result)
}

export function decryptData(encryptedData: string, key: sjcl.BitArray): string {
  let rawCipherText: sjcl.BitArray
  let rawIV: sjcl.BitArray
  let cipherName: keyof sjcl.SjclCiphers
  let modeName: keyof sjcl.SjclModes

  try {
    const resultObject = JSON.parse(base64Decode(encryptedData))
    rawIV = sjcl.codec.base64.toBits(resultObject.IV)
    rawCipherText = sjcl.codec.base64.toBits(resultObject.cipherText)
    cipherName = resultObject.cipherName
    modeName = resultObject.modeName
  } catch (e) {
    throw new Error('Corrupt data.')
  }

  const cipher = new sjcl.cipher[cipherName](key)
  if (modeName === 'ocb2progressive') throw new Error('Unsupported mode.')
  const rawData = sjcl.mode[modeName].decrypt(cipher, rawCipherText, rawIV)

  return sjcl.codec.utf8String.fromBits(rawData)
}

export function calculateMasterKey(
  s0: string,
  email: string,
  password: string,
  kdfParams: KdfParams,
): sjcl.BitArray {
  if (kdfParams.id === 2) {
    email = email.toLowerCase()
  }

  const versionBits = sjcl.codec.hex.toBits('0x01')
  const s0Bits = sjcl.codec.base64.toBits(s0)
  const emailBits = sjcl.codec.utf8String.toBits(email)
  const unhashedSaltBits = reduce([versionBits, s0Bits, emailBits], sjcl.bitArray.concat)
  const salt = sjcl.hash.sha256.hash(unhashedSaltBits!)

  return sjcl.misc.scrypt(password, salt, kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.bits)
}

export function base64Encode(str: string): string {
  return Buffer.from(str).toString('base64')
}

export function base64Decode(str: string): string {
  return Buffer.from(str, 'base64').toString()
}

export function encryptSecretSeed(seed: string, key: sjcl.BitArray): string {
  const sessionKey = deriveSessionKey(key)
  return encryptData(seed, sessionKey)
}

export function decryptSecretSeed(seed: string, key: sjcl.BitArray): string {
  const sessionKey = deriveSessionKey(key)
  return decryptData(seed, sessionKey)
}
