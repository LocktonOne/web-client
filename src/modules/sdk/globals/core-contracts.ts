import { type Provider, type RawProvider } from '@distributedlab/w3p'

import { config } from '@/config'

// import { coreApolloClient } from '../api'
import {
  createConstantsRegistryContract,
  createMasterAccessManagement,
  createMasterContractsRegistry,
  createReviewableRequests,
} from '../contracts'
// import { GetCoreContracts, type GetCoreContractsQuery } from '../types'

export class CoreContracts {
  #provider: Provider
  #rawProvider: RawProvider

  #masterAccessManagementContractAddress = ''
  #constantsRegistryContractAddress = ''
  #reviewableRequestsContractAddress = ''

  public masterRoleId = ''
  public bannedRoleId = ''

  constructor(provider: Provider, rawProvider: RawProvider) {
    this.#provider = provider
    this.#rawProvider = rawProvider
  }

  get provider() {
    return this.#provider
  }

  get rawProvider() {
    return this.#rawProvider
  }

  async loadCoreContractsAddresses() {
    const masterContractsRegistry = this.getMasterContractsRegistryContract()

    // const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
    //   query: GetCoreContracts,
    // })

    this.#masterAccessManagementContractAddress =
      // data?.contracts?.find(el => el.id === 'MASTER_ACCESS_MANAGEMENT')?.address ||
      await masterContractsRegistry.getMasterAccessManagement()

    this.#constantsRegistryContractAddress =
      // data?.contracts?.find(el => el.id === 'CONSTANTS_REGISTRY')?.address ||
      await masterContractsRegistry.getConstantsRegistry()

    this.#reviewableRequestsContractAddress =
      // data?.contracts?.find(el => el.id === 'REVIEWABLE_REQUESTS')?.address ||
      await masterContractsRegistry.getReviewableRequests()
  }

  async getContractAddressByName(name: string) {
    const masterContractsRegistry = this.getMasterContractsRegistryContract()

    // const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
    //   query: GetCoreContracts,
    // })

    return (
      // data?.contracts?.find(el => el.id === name)?.address ||
      await masterContractsRegistry.getContractAddressByName(name)
    )
  }

  getMasterContractsRegistryContract() {
    return createMasterContractsRegistry(
      config.MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS,
      this.#rawProvider,
    )
  }

  getMasterAccessManagementContract() {
    return createMasterAccessManagement(
      this.#masterAccessManagementContractAddress,
      this.#provider,
      this.#rawProvider,
    )
  }

  getConstantsRegistryContract() {
    return createConstantsRegistryContract(
      this.#constantsRegistryContractAddress,
      this.#provider,
      this.#rawProvider,
    )
  }

  getReviewableRequestsContract() {
    return createReviewableRequests(
      this.#reviewableRequestsContractAddress,
      this.#rawProvider,
      this.#provider,
    )
  }
}

export let coreContracts: CoreContracts

export const initCoreContracts = async (provider: Provider, rawProvider: RawProvider) => {
  coreContracts = new CoreContracts(provider, rawProvider)
}
