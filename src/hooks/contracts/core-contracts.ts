import { type Provider, type RawProvider } from '@distributedlab/w3p'
import { useState } from 'react'

// import { coreApolloClient } from '@/api/graphql'
import { config } from '@/config'
import {
  useConstantsRegistry,
  useMasterAccessManagement,
  useMasterContractsRegistry,
  useReviewableRequests,
} from '@/hooks'
// import { GetCoreContracts, type GetCoreContractsQuery } from '@/types'

export const useCoreContracts = (provider: Provider, rawProvider: RawProvider) => {
  const [masterAccessManagementContractAddress, setMasterAccessManagementContractAddress] =
    useState('')
  const [constantsRegistryContractAddress, setConstantsRegistryContractAddress] = useState('')
  const [reviewableRequestsContractAddress, setReviewableRequestsContractAddress] = useState('')

  // const [masterRoleId, setMasterRoleIdx] = useState('')
  // const [bannedRoleId, setBannedRoleId] = useState('')

  const reviewableRequest = useReviewableRequests(reviewableRequestsContractAddress, provider)
  const masterContractsRegistry = useMasterContractsRegistry(
    config.MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS,
    provider,
    rawProvider,
  )

  const masterAccessManagement = useMasterAccessManagement(
    masterAccessManagementContractAddress,
    provider,
    rawProvider,
  )

  const constantsRegistry = useConstantsRegistry(
    constantsRegistryContractAddress,
    provider,
    rawProvider,
  )

  const getContractAddressByName = async (name: string) => {
    const masterContractsRegistry = getMasterContractsRegistryContract()

    // const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
    //   query: GetCoreContracts,
    // })
    return (
      // data?.contracts?.find(el => el.id === name)?.address ||
      await masterContractsRegistry.getContractAddressByName(name)
    )
  }

  const getMasterContractsRegistryContract = () => {
    return masterContractsRegistry
  }

  const getMasterAccessManagementContract = () => {
    return masterAccessManagement
  }

  const getConstantsRegistryContract = () => {
    return constantsRegistry
  }

  const getReviewableRequestsContract = () => {
    return reviewableRequest
  }

  const initContracts = async () => {
    // const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
    //   query: GetCoreContracts,
    // })

    setMasterAccessManagementContractAddress(
      // data?.contracts?.find(el => el.id === 'MASTER_ACCESS_MANAGEMENT')?.address ||
      await masterContractsRegistry.getMasterAccessManagement(),
    )

    setConstantsRegistryContractAddress(
      // data?.contracts?.find(el => el.id === 'CONSTANTS_REGISTRY')?.address ||
      await masterContractsRegistry.getConstantsRegistry(),
    )

    setReviewableRequestsContractAddress(
      // data?.contracts?.find(el => el.id === 'REVIEWABLE_REQUESTS')?.address ||
      await masterContractsRegistry.getReviewableRequests(),
    )
  }

  return {
    getConstantsRegistryContract,
    getMasterContractsRegistryContract,
    getMasterAccessManagementContract,
    getReviewableRequestsContract,
    getContractAddressByName,
    initContracts,

    provider,
    rawProvider,
  }
}
