import { useState } from 'react'

import { coreApolloClient } from '@/api/graphql'
import { RequestsStatuses } from '@/enums'
import { useCoreContracts } from '@/hooks'
import { web3Store } from '@/store'
import {
  GetUserKycRequestsByStatus,
  type GetUserKycRequestsByStatusQuery,
  type Kyc,
  type RequestDescriptionKyc,
} from '@/types'
import { BlobUtil } from '@/utils'

import { useKycRequests } from './requests'

export const useKycUser = () => {
  const [contractAddress, setContractAddress] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [actualKyc, setActualKyc] = useState<Kyc>()

  const [pendingKyc, setPendingKyc] = useState<Kyc>()
  const [rejectedKyc, setRejectedKyc] = useState<Kyc>()

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadFailed, setIsLoadedFailed] = useState(false)

  const coreContracts = useCoreContracts(web3Store.provider!, web3Store.provider!.rawProvider!)

  const kycRequestsContract = useKycRequests(
    contractAddress,
    coreContracts.provider,
    coreContracts.rawProvider,
  )

  const loadActualKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        misc: coreContracts.provider.address!.toLowerCase(),
        status: RequestsStatuses.ACCEPTED,
      },
    })

    if (!data.requests?.[0]) return

    setActualKyc({
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    })
  }

  const loadPendingKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        misc: coreContracts.provider.address!.toLowerCase(),
        status: RequestsStatuses.PENDING,
      },
    })

    if (!data.requests?.[0]) return

    setPendingKyc({
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    })
  }

  const loadRejectedKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        misc: coreContracts.provider.address!.toLowerCase(),
        status: RequestsStatuses.REJECTED,
      },
    })

    if (!data.requests?.[0]) return

    setRejectedKyc({
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    })
  }

  const loadAllKyc = async () => {
    await Promise.all([loadActualKyc(), loadPendingKyc(), loadRejectedKyc()])
  }

  const parseRequestKyc = async (storageId?: string) => {
    try {
      if (!storageId) throw new TypeError('storageId is not exist')

      const kycBlob = new BlobUtil<RequestDescriptionKyc>({
        id: storageId,
      })

      await kycBlob.load()

      return {
        firstName: kycBlob.rawData?.firstName,
        lastName: kycBlob.rawData?.lastName,
        passportIssuanceDate: kycBlob.rawData?.passportIssuanceDate,
        passportSerialNumber: kycBlob.rawData?.passportSerialNumber,
      } as Kyc
    } catch (error) {
      return {
        firstName: '',
        lastName: '',
        passportSerialNumber: '',
        passportIssuanceDate: '',
      } as unknown as Kyc
    }
  }

  const dropKYCRequest = async () => {
    setIsSubmitting(true)

    await kycRequestsContract.dropKYCRequest()
    setIsSubmitting(false)
  }

  const requestKYCRole = async (description: string) => {
    setIsSubmitting(true)
    await kycRequestsContract.requestKYC(description)
    setIsSubmitting(false)
  }

  const usersRequestInfo = async () => {
    await kycRequestsContract.usersRequestInfo(coreContracts.provider.address!)
  }

  const init = async (extensionName?: string) => {
    await coreContracts.initContracts()
    setContractAddress(
      await coreContracts.getContractAddressByName(extensionName ?? 'REVIEWABLE_REQUESTS'),
    )
  }

  return {
    isSubmitting,
    isLoaded,
    isLoadFailed,

    actualKyc,
    pendingKyc,
    rejectedKyc,

    init,

    setIsLoaded,
    setIsLoadedFailed,

    loadAllKyc,

    dropKYCRequest,
    requestKYCRole,
    usersRequestInfo,
  }
}
