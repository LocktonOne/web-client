import { Buffer } from 'buffer'
import crypto from 'crypto-browserify'
import * as elliptic from 'elliptic'
import * as script from 'scrypt-js'
import sjcl from 'sjcl-tokend'
import { KdfParams } from 'src/api/modules/keyserver'

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

  let cypherKey = await script.scrypt(
    Buffer.from(password),
    biteSalt,
    kdfParams.n,
    kdfParams.r,
    kdfParams.p,
    kdfParams.bits,
  )


  // Генерация ключевой пары из приватного ключа
  const keyPair = EC.keyFromSecret(cypherKey);

  // Получение приватного ключа в формате hex
  const secret = keyPair.getSecret('hex');
  const publicKey = keyPair.getPublic('hex')
  const privateKeyHex = EC.keyFromSecret(secret)
  console.log(privateKeyHex, 'privete');
  console.log(publicKey, 'public');
  // const keyPair = EC.keyFromSecret(Buffer.from(cypherKey))
  // console.log(keyPair.getPublic('hex'));
  return keyPair
}

export function encryptData(data: string, key: string) {
  // key is 512 lenght, 512 - is unsupported length for aes
  // if (![16, 24, 32].includes(key.length)) {
  //   throw new Error('Invalid AES key size')
  // } // FIXME!

  const cipherName = 'aes'
  const modeName = 'gcm'

  const halfKey = key.substr(0, 32) // FIXME!

  const cipher = new sjcl.cipher[cipherName](sjcl.codec.utf8String.toBits(halfKey))

  const rawIV = new Uint8Array(randomBytes(ivLength))

  const encryptedData = sjcl.mode[modeName].encrypt(
    cipher,
    sjcl.codec.utf8String.toBits(data),
    rawIV as unknown as sjcl.BitArray,
  )

  const wallet = JSON.stringify({
    IV: sjcl.codec.base64.fromBits(rawIV as unknown as sjcl.BitArray),
    cipherText: sjcl.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName,
  })

  return base64Encode(wallet)
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
  const halfKey = key.substr(0, 32) // FIXME!
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
