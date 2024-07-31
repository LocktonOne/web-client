import { useRef, useState } from 'react'

import { RequestsStatuses } from '@/enums'
import { createKycRequestsContracts } from '@/modules/sdk'
import { type Kyc, type RequestDescriptionKyc } from '@/types'

import { coreApolloClient } from '../api'
import { coreContracts } from '../globals'
import { GetUserKycRequestsByStatus, GetUserKycRequestsByStatusQuery } from '../types'
import { BlobUtil } from '../utils'

export const useKycUser = () => {
  const contractAddress = useRef('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [actualKyc, setActualKyc] = useState<Kyc>()

  const [pendingKyc, setPendingKyc] = useState<Kyc>()
  const [rejectedKyc, setRejectedKyc] = useState<Kyc>()

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadFailed, setIsLoadedFailed] = useState(false)

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
    const kycRequestsContract = createKycRequestsContracts(
      contractAddress.current,
      coreContracts.rawProvider,
      coreContracts.provider,
    )
    setIsSubmitting(true)

    await kycRequestsContract.dropKYCRequest()
    setIsSubmitting(false)
  }

  const requestKYCRole = async (description: string) => {
    const kycRequestsContract = createKycRequestsContracts(
      contractAddress.current,
      coreContracts.rawProvider,
      coreContracts.provider,
    )

    setIsSubmitting(true)
    await kycRequestsContract.requestKYC(description)
    setIsSubmitting(false)
  }

  const usersRequestInfo = async () => {
    const kycRequestsContract = createKycRequestsContracts(
      contractAddress.current,
      coreContracts.rawProvider,
      coreContracts.provider,
    )

    await kycRequestsContract.usersRequestInfo(coreContracts.provider.address!)
  }

  const init = async (extensionName?: string) => {
    contractAddress.current = await coreContracts.getContractAddressByName(
      extensionName ?? 'KYC_REQUESTS',
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
