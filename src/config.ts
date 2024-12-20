import packageJson from '../package.json'

export type Config = {
  APP_NAME: string
  API_URL: string
  BUILD_VERSION: string
  CORE_GRAPH_URL: string
  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: string
  NATIVE_TOKEN: string
  RPC_URL: string
  DEFAULT_CHAIN: string
  DEFAULT_NETWORK_NAME: string
}

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_URL: import.meta.env.VITE_API_URL,
  CORE_GRAPH_URL: import.meta.env.VITE_CORE_GRAPH_URL,
  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: import.meta.env
    .VITE_MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
  NATIVE_TOKEN: import.meta.env.VITE_NATIVE_TOKEN,
  RPC_URL: import.meta.env.VITE_RPC_URL,
  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN,
  DEFAULT_NETWORK_NAME: import.meta.env.VITE_DEFAULT_NETWORK_NAME,
}
