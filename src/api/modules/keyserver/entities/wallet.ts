import { isNil, isString } from 'lodash'
import sjcl from 'sjcl-tokend'

import { KdfParams } from '@/api/modules'

import * as crypto from '../helpers/crypto'
import { Keypair } from '../helpers/keypair'

/**
 * Manages user's key pair.
 *
 * @class
 */
export class Wallet {
  #email: string
  #signingKeypair: Keypair
  #accountId: string
  #id?: string
  #sessionId?: string
  #sessionKey?: string
  #keypairs: Keypair[]

  /**
   * Create a new instance from user's key pair.
   *
   * @constructor
   *
   * @param email User's email.
   * @param signingKeypair User's key pair or a secret seed.
   * @param accountId User's account ID.
   * @param walletId Wallet ID.
   * @param sessionId Session ID.
   * @param sessionKey Session key.
   * @param keypairs Array of Keypair or secret seeds saved in key storage.
   */
  constructor(
    email: string,
    signingKeypair: Keypair | string,
    accountId: string,
    walletId?: string,
    sessionId?: string,
    sessionKey?: string,
    keypairs: Array<Keypair | string> = [],
  ) {
    if (isNil(email)) {
      throw new Error('Email is required.')
    }

    if (isString(signingKeypair)) {
      signingKeypair = Keypair.fromSecret(signingKeypair)
    }

    if (!Keypair.isValidPublicKey(accountId)) {
      throw new Error('Invalid account ID.')
    }

    if (walletId && !isString(walletId)) {
      throw new Error('Hex encoded wallet ID expected.')
    }

    if (sessionId && !isString(sessionId)) {
      throw new Error('Hex encoded session ID expected.')
    }

    if (sessionKey && !isString(sessionKey)) {
      throw new Error('Hex encoded session key expected.')
    }

    this.#email = email
    this.#signingKeypair = signingKeypair as Keypair
    this.#accountId = accountId
    this.#id = walletId
    this.#sessionId = sessionId
    this.#sessionKey = sessionKey
    this.#keypairs = Array.from(
      new Set([
        this.#signingKeypair.secret(),
        ...keypairs.map(item => (isString(item) ? item : item.secret())),
      ]),
    ).map(secret => Keypair.fromSecret(secret))
  }

  /**
   * Generate a new wallet.
   *
   * @param email User's email.
   * @param accountId User's account ID.
   * @param keypairs Array of Keypair or secret seeds saved in key storage.
   * @return The new wallet.
   */
  static generate(
    email: string,
    accountId: string | null = null,
    keypairs: Array<Keypair | string> = [],
  ): Wallet {
    const keypair = Keypair.random()
    accountId = accountId || keypair.accountId()

    return new Wallet(email, keypair, accountId, undefined, undefined, undefined, [
      keypair,
      ...keypairs,
    ])
  }

  /**
   * Decrypt a wallet obtained from a wallet server.
   *
   * @param opts Wallet decryption options.
   */
  static fromEncrypted(opts: {
    keychainData: string
    kdfParams: KdfParams
    salt: string
    email: string
    password: string
    sessionId?: string
    sessionKey?: string
    accountId?: string
  }): Wallet {
    const rawMasterKey = crypto.calculateMasterKey(
      opts.salt,
      opts.email,
      opts.password,
      opts.kdfParams,
    )
    const rawWalletId = crypto.deriveWalletId(rawMasterKey)
    const rawWalletKey = crypto.deriveWalletKey(rawMasterKey)
    const decryptedKeychain = JSON.parse(crypto.decryptData(opts.keychainData, rawWalletKey))

    const mainSeed = decryptedKeychain.seed || decryptedKeychain.seeds[0]
    const allSeeds = decryptedKeychain.seeds || [mainSeed]

    return new Wallet(
      opts.email,
      Keypair.fromSecret(mainSeed),
      opts.accountId || decryptedKeychain.accountId,
      sjcl.codec.hex.fromBits(rawWalletId),
      opts.sessionId ?? '',
      opts.sessionKey ?? '',
      allSeeds,
    )
  }

  /**
   * Restore recovery wallet from a recovery seed.
   *
   * @param kdfParams Scrypt params.
   * @param salt Salt used for encryption.
   * @param email User's email.
   * @param recoverySeed User's recovery seed.
   */
  static fromRecoverySeed(
    kdfParams: KdfParams,
    salt: string,
    email: string,
    recoverySeed: string,
  ): Wallet {
    const recoveryKeypair = Keypair.fromSecret(recoverySeed)
    const walletId = Wallet.deriveId(email, recoverySeed, kdfParams, salt)

    return new Wallet(email, recoveryKeypair, recoveryKeypair.accountId(), walletId)
  }

  /** @returns A cloned wallet. */
  static clone(wallet: Wallet): Wallet {
    if (!(wallet instanceof Wallet)) {
      throw new TypeError('The arg should be a Wallet instance')
    }
    return new Wallet(
      wallet.#email,
      wallet.#signingKeypair,
      wallet.#accountId,
      wallet.#id,
      wallet.#sessionId,
      wallet.#sessionKey,
      wallet.#keypairs,
    )
  }

  clone(): Wallet {
    return Wallet.clone(this)
  }

  /**
   * Derive the wallet ID.
   *
   * @param email User's email.
   * @param password User's password.
   * @param kdfParams KDF params.
   * @param salt Salt used for encryption.
   * @return Wallet ID.
   */
  static deriveId(email: string, password: string, kdfParams: KdfParams, salt: string): string {
    const masterKey = crypto.calculateMasterKey(salt, email, password, kdfParams)
    const walletId = crypto.deriveWalletId(masterKey)

    return sjcl.codec.hex.fromBits(walletId)
  }

  get id(): string {
    if (!this.#id) {
      throw new Error('This wallet has no wallet ID yet.')
    }
    return this.#id
  }

  get accountId(): string {
    return this.#accountId
  }

  get email(): string {
    return this.#email
  }

  get secretSeed(): string {
    return this.#signingKeypair.secret()
  }

  get secretSeeds(): string[] {
    return this.#keypairs.map(item => item.secret())
  }

  get keypair(): Keypair {
    return this.#signingKeypair
  }

  get keypairs(): Keypair[] {
    return this.#keypairs
  }

  get nonSigningKeypairs(): Keypair[] {
    const curKpId = this.#signingKeypair.accountId()
    return this.#keypairs.filter(el => el.accountId() !== curKpId)
  }

  get sessionId(): string | undefined {
    return this.#sessionId
  }

  get sessionKey(): string | undefined {
    return this.#sessionKey
  }

  encrypt(
    kdfParams: KdfParams,
    password: string,
  ): { id: string; accountId: string; email: string; salt: string; keychainData: string } {
    if (isNil(kdfParams)) {
      throw new Error('KDF params required')
    }
    if (!isString(password) || password.length === 0) {
      throw new TypeError('Password must be a non-empty string')
    }

    const salt = crypto.randomBytes(16).toString('base64')
    const masterKey = crypto.calculateMasterKey(salt, this.email, password, kdfParams)

    const walletKey = crypto.deriveWalletKey(masterKey)
    const rawKeychainData = {
      accountId: this.accountId,
      seeds: this.secretSeeds,
    }
    const keychainData = crypto.encryptData(JSON.stringify(rawKeychainData), walletKey)

    const rawWalletId = crypto.deriveWalletId(masterKey)
    this.#id = sjcl.codec.hex.fromBits(rawWalletId)

    return {
      id: this.#id,
      accountId: this.accountId,
      email: this.email,
      salt,
      keychainData,
    }
  }

  encryptRecoveryData(
    kdfParams: KdfParams,
    recoveryKeypair: Keypair,
  ): { id: string; accountId: string; email: string; salt: string; keychainData: string } {
    const recoveryWallet = new Wallet(this.email, this.#signingKeypair, recoveryKeypair.accountId())

    return recoveryWallet.encrypt(kdfParams, recoveryKeypair.secret())
  }

  switchSigningKeypair(kpPubKey: string): Wallet {
    if (!Keypair.isValidPublicKey(kpPubKey)) {
      throw new TypeError('The argument should be a valid public key')
    }

    const kp = this.#keypairs.find(el => el.accountId() === kpPubKey)
    if (!kp) {
      throw new ReferenceError(
        `The wallet does not contain a keypair with the provided public key: ${kpPubKey}`,
      )
    }

    this.useSigningKeypair(kp)
    return this
  }

  useSigningKeypair(keypair: Keypair | string): void {
    this.#signingKeypair = isString(keypair) ? Keypair.fromSecret(keypair) : keypair
  }
}
