/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_NAME: string
  VITE_BUILD_VERSION: string
  APP_NAME: string
  API_URL: string
  BUILD_VERSION: string
  CORE_GRAPH_URL: string
  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: string
  NATIVE_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Document {
    ENV: ImportMetaEnv
  }
}
