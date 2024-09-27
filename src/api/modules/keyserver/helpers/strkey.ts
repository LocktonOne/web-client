import * as crypto from 'crypto'

// Функция для декодирования публичного или приватного ключа из hex-строки
export function decodeHex(encoded: string): Buffer {
  if (!encoded.startsWith('0x')) {
    throw new Error('Invalid format: missing "0x" prefix.')
  }

  return Buffer.from(encoded.slice(2), 'hex')
}

// Функция для кодирования данных (например, ключей) в hex-строку с версией байта

export function encodeHex(data: Buffer): string {
  if (!data) {
    throw new Error('Cannot encode null or undefined data.')
  }

  return '0x' + data.toString('hex')
}

// Проверка контрольной суммы для Ethereum-адреса (EIP-55)
export function isValidChecksumAddress(address: string): boolean {
  // Убедимся, что адрес имеет длину 42 символа (0x + 40 hex символов)
  if (address.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return false
  }

  const addressHash = crypto
    .createHash('keccak256')
    .update(address.slice(2).toLowerCase())
    .digest('hex')

  // Проверяем каждую букву в адресе по правилу EIP-55
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
