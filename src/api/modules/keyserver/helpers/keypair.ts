import * as crypto from 'crypto'
import * as secp256k1 from 'secp256k1'

import * as strkey from './strkey'

export class Keypair {
  #publicKey: Buffer
  #secretKey?: Buffer

  constructor(keys: { publicKey: Buffer; secretKey?: Buffer }) {
    this.#publicKey = Buffer.from(keys.publicKey)
    if (keys.secretKey) {
      this.#secretKey = Buffer.from(keys.secretKey)
    }
  }

  static fromSecret(secretKey: string): Keypair {
    const rawSeed = Buffer.from(secretKey.slice(2), 'hex')
    return this.fromRawSeed(rawSeed)
  }

  static fromRawSeed(rawSeed: Buffer): Keypair {
    if (rawSeed.length !== 32) {
      throw new Error('Invalid seed length. Expected 32 bytes.')
    }
    const privateKey = rawSeed
    const publicKey = secp256k1.publicKeyCreate(privateKey, false)
    return new this({
      publicKey: Buffer.from(publicKey),
      secretKey: Buffer.from(privateKey),
    })
  }

  static random(): Keypair {
    const seed = crypto.randomBytes(32)
    return this.fromRawSeed(seed)
  }

  static isValidPublicKey(publicKey: string): boolean {
    try {
      const decoded = strkey.decodeHex(publicKey)
      return decoded.length === 65
    } catch (e) {
      return false
    }
  }

  rawPublicKey(): Buffer {
    return this.#publicKey
  }

  accountId(): string {
    return strkey.encodeHex(this.#publicKey)
  }

  secret(): string {
    if (!this.#secretKey) {
      throw new Error('No secret key available.')
    }
    return strkey.encodeHex(this.#secretKey)
  }

  canSign(): boolean {
    return !!this.#secretKey
  }

  sign(data: Buffer): Buffer {
    if (!this.canSign()) {
      throw new Error('Cannot sign: no secret key available.')
    }
    const signature = secp256k1.ecdsaSign(data, this.#secretKey!)
    return Buffer.from(signature.signature)
  }

  verify(data: Buffer, signature: Buffer): boolean {
    return secp256k1.ecdsaVerify(signature, data, this.#publicKey)
  }
}
