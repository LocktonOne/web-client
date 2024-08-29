export type TokenInfo = {
  name: string
  symbol: string
  decimals: number
  totalSupply: number | string
  totalSupplyCap: number | string
  permissions: string[]
  address: string
}

export type SelectOption = {
  label: string
  value: string
  addr: string
}
