import { mapKeys, pickBy } from 'lodash-es'

import packageJson from '../package.json'

export type Config = {
  APP_NAME: string
  API_URL: string
  BUILD_VERSION: string
  CORE_GRAPH_URL: string
  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: string
  NATIVE_TOKEN: string
}

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_URL: import.meta.env.VITE_API_URL,
  CORE_GRAPH_URL: import.meta.env.VITE_CORE_GRAPH_URL,
  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: import.meta.env
    .VITE_MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
  NATIVE_TOKEN: import.meta.env.VITE_NATIVE_TOKEN,
}

function _mapEnvCfg(env: ImportMetaEnv): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_')),
    (v, k) => k.replace(/^VITE_/, ''),
  )
}

Object.assign(config, _mapEnvCfg(import.meta.env))
// @ts-expect-error because idk
Object.assign(config, _mapEnvCfg(document.ENV))
