import { type Provider, type RawProvider } from '@distributedlab/w3p'

import { config } from '@/config'

import { coreApolloClient } from '../api'
import {
  createAllowedContractRegistryContract,
  createConstantsRegistryContract,
  createMasterAccessManagement,
  createMasterContractsRegistry,
  createReviewableRequests,
  createTokenFactory,
} from '../contracts'
import { GetCoreContracts, type GetCoreContractsQuery } from '../types'

export class CoreContracts {
  #provider: Provider
  #rawProvider: RawProvider

  #masterAccessManagementContractAddress = ''
  #constantsRegistryContractAddress = ''
  #reviewableRequestsContractAddress = ''
  #tokenFactoryContractAddress = ''
  #allowedContractRegistryAddress = ''

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
    const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
      query: GetCoreContracts,
    })
    console.log(data?.contracts)
    this.#masterAccessManagementContractAddress =
      data?.contracts?.find(el => el.id === 'MASTER_ACCESS_MANAGEMENT')?.address ||
      (await masterContractsRegistry.getMasterAccessManagement())
    console.log("MASTER_ACCESS_MANAGEMENT")
    this.#constantsRegistryContractAddress =
      data?.contracts?.find(el => el.id === 'CONSTANTS_REGISTRY')?.address ||
      (await masterContractsRegistry.getConstantsRegistry())

    this.#reviewableRequestsContractAddress =
      data?.contracts?.find(el => el.id === 'REVIEWABLE_REQUESTS')?.address ||
      (await masterContractsRegistry.getReviewableRequests())

    this.#tokenFactoryContractAddress =
      data?.contracts?.find(el => el.id === 'TOKEN_FACTORY')?.address ||
      (await masterContractsRegistry.getTokenFactory())

    this.#allowedContractRegistryAddress =
      data?.contracts?.find(el => el.id === 'ALLOWED_CONTRACT_REGISTRY')?.address ||
      (await masterContractsRegistry.getAllowedContractRegistry())
  }

  async getContractAddressByName(name: string) {
    const masterContractsRegistry = this.getMasterContractsRegistryContract()
    const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
      query: GetCoreContracts,
    })

    return (
      data?.contracts?.find(el => el.id === name)?.address ||
      (await masterContractsRegistry.getContractAddressByName(name))
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

  getTokenFactoryContract() {
    return createTokenFactory(this.#tokenFactoryContractAddress, this.#rawProvider, this.#provider)
  }

  getAllowedContractRegistry() {
    return createAllowedContractRegistryContract(
      this.#allowedContractRegistryAddress,
      this.#rawProvider,
      this.#provider,
    )
  }
}

export let coreContracts: CoreContracts

export const initCoreContracts = async (provider: Provider, rawProvider: RawProvider) => {
  coreContracts = new CoreContracts(provider, rawProvider)
}
