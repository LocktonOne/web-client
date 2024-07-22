declare module 'crypto-browserify' {
  export function randomFillSync(buffer: Buffer): void
}

declare module 'sjcl-tokend' {
  import sjcl from 'sjcl'

  export = sjcl
}
