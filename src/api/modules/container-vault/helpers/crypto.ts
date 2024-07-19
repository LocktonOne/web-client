import { Buffer } from 'buffer'
import crypto from 'crypto-browserify'
import * as elliptic from 'elliptic'
import * as script from 'scrypt-js'
import sjcl from 'sjcl'

import { KdfParams } from '@/api/modules/container-vault'

const EC = new elliptic.eddsa('ed25519')
const ivLength = 96 / 8

export function randomBytes(length: number) {
  const buffer = Buffer.alloc(length)
  crypto.randomFillSync(buffer)

  return buffer
}

export async function calculateKeys(
  salt: string,
  email: string,
  password: string,
  kdfParams: KdfParams,
) {
  if (kdfParams.id === 2) {
    email = email.toLowerCase()
  }

  const rawSalt = salt + email
  const hashedSalt = sjcl.hash.sha256.hash(rawSalt)
  const biteSalt = sjcl.codec.bytes.fromBits(hashedSalt)

  const cypherKey = await script.scrypt(
    Buffer.from(password),
    biteSalt,
    kdfParams.n,
    kdfParams.r,
    kdfParams.p,
    kdfParams.bits,
  )

  const keyPair = EC.keyFromSecret(Buffer.from(cypherKey))

  return keyPair
}

export function encryptData(data: string, key: string) {
  // key is 64 lenght, 64 - is unsupported length for aes
  // if (![16, 24, 32].includes(key.length)) {
  //   throw new Error('Invalid AES key size')
  // } // FIXME!

  const cipherName = 'aes'
  const modeName = 'gcm'
  const halfKey = key.substr(0, key.length / 2) // FIXME!

  const cipher = new sjcl.cipher[cipherName](sjcl.codec.utf8String.toBits(halfKey))

  const rawIV = new Uint8Array(randomBytes(ivLength))

  const encryptedData = sjcl.mode[modeName].encrypt(
    cipher,
    sjcl.codec.utf8String.toBits(data),
    rawIV as unknown as sjcl.BitArray,
  )

  const container = JSON.stringify({
    IV: sjcl.codec.base64.fromBits(rawIV as unknown as sjcl.BitArray),
    cipherText: sjcl.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName,
  })

  return base64Encode(container)
}

export function decryptData(encryptedData: string, key: string) {
  let rawCipherText
  let rawIV
  let cipherName: keyof sjcl.SjclCiphers
  let modeName: keyof sjcl.SjclModes
  try {
    const decodedData = base64Decode(encryptedData)
    const resultObject = JSON.parse(decodedData)
    rawIV = sjcl.codec.base64.toBits(resultObject.IV)
    rawCipherText = sjcl.codec.base64.toBits(resultObject.cipherText)
    cipherName = resultObject.cipherName
    modeName = resultObject.modeName
  } catch (error) {
    throw new Error('Corrupt data.')
  }
  const halfKey = key.substr(0, key.length / 2) // FIXME!
  const cipher = new sjcl.cipher[cipherName](sjcl.codec.utf8String.toBits(halfKey))
  if (modeName === 'ocb2progressive') throw new Error('Unsupported mode.')
  const rawData = sjcl.mode[modeName].decrypt(cipher, rawCipherText, rawIV)

  return sjcl.codec.utf8String.fromBits(rawData)
}

export function base64Encode(str: string) {
  return Buffer.from(str).toString('base64')
}

export function base64Decode(str: string) {
  return Buffer.from(str, 'base64').toString('ascii')
}
