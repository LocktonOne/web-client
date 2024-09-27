import * as crypto from 'crypto'

export function decodeHex(encoded: string): Buffer {
  if (!encoded.startsWith('0x')) {
    throw new Error('Invalid format: missing "0x" prefix.')
  }

  return Buffer.from(encoded.slice(2), 'hex')
}

export function encodeHex(data: Buffer): string {
  if (!data) {
    throw new Error('Cannot encode null or undefined data.')
  }

  return '0x' + data.toString('hex')
}

export function isValidChecksumAddress(address: string): boolean {
  // Убедимся, что адрес имеет длину 42 символа (0x + 40 hex символов)
  if (address.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return false
  }

  const addressHash = crypto
    .createHash('keccak256')
    .update(address.slice(2).toLowerCase())
    .digest('hex')

  for (let i = 0; i < 40; i++) {
    const char = address[i + 2]
    const hashChar = parseInt(addressHash[i], 16)

    if (
      (hashChar > 7 && char !== char.toUpperCase()) ||
      (hashChar <= 7 && char !== char.toLowerCase())
    ) {
      return false
    }
  }
  return true
}
