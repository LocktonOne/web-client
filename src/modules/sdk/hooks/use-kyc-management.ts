import { useState } from 'react'

import { RequestsStatuses } from '@/enums'
import {
  BlobUtil,
  GetKycRequestsByAddress,
  GetUserKycRequestsByStatus,
  GetUserKycRequestsByStatusQuery,
} from '@/modules/sdk'
import { Kyc, type RequestDescriptionKyc } from '@/types'

import { coreApolloClient } from '../api'
import { coreContracts } from '../globals'
import { GetKycRequests, GetKycRequestsQuery } from '../types'

export const useKycManagement = (queryParams?: {
  id?: string
  offset?: number
  limit?: number
}) => {
  const filters = {
    id: queryParams?.id || '',
    offset: queryParams?.offset || 0,
    limit: queryParams?.limit || 10,
  }

  const {
    acceptRequest: _acceptRequest,
    dropRequest: _dropRequest,
    rejectRequest: _rejectRequest,
  } = coreContracts.getReviewableRequestsContract()

  const [kycList, setKycList] = useState<Kyc[]>([])

  const [kyc, setKyc] = useState<Kyc>()

  const [actualKyc, setActualKyc] = useState<Kyc[]>([])

  const [pendingKyc, setPendingKyc] = useState<Kyc[]>([])
  const [rejectedKyc, setRejectedKyc] = useState<Kyc[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingError, setIsLoadingError] = useState(true)

  const loadKycRequests = async (creatorAddr: string) => {
    setIsLoading(true)
    const { data } = await coreApolloClient.query<GetKycRequestsQuery>({
      query: GetKycRequests,
      fetchPolicy: 'network-only',
      variables: {
        creator: creatorAddr,
        id: filters.id,
        offset: filters.offset,
        limit: filters.limit,
      },
    })

    if (!data.requests?.length) return

    setKycList(
      await Promise.all(
        data!.requests!.map(async el => ({
          ...(await parseRequestKyc(el.description)),
          id: el.id,
          address: el.misc,
          status: el.status,
          rejectReason: el.rejectReason,
          timestamp: Number(el.timestamp),
        })),
      ),
    )
    setIsLoading(false)
  }

  const loadKycRequest = async (addr: string) => {
    setIsLoading(true)
    const { data } = await coreApolloClient.query<GetKycRequestsQuery>({
      query: GetKycRequestsByAddress,
      fetchPolicy: 'network-only',
      variables: {
        address: addr,
      },
    })

    if (!data.requests.length) return

    setKyc({
      ...(await parseRequestKyc(data.requests[0].description)),
      id: data.requests[0].id,
      address: data.requests[0].misc,
      status: data.requests[0].status,
      rejectReason: data.requests[0].rejectReason,
      timestamp: Number(data.requests[0].timestamp),
    })

    setIsLoading(false)
  }

  const loadActualKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        status: RequestsStatuses.ACCEPTED,
      },
    })

    if (!data.requests?.length) return

    setActualKyc(
      await Promise.all(
        data!.requests!.map(async el => ({
          ...(await parseRequestKyc(el.description)),
          id: el.id,
          address: el.misc,
          status: el.status,
          rejectReason: el.rejectReason,
          timestamp: Number(el.timestamp),
        })),
      ),
    )
  }

  const loadPendingKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        status: RequestsStatuses.PENDING,
      },
    })

    if (!data.requests?.length) return

    setPendingKyc(
      await Promise.all(
        data!.requests!.map(async el => ({
          ...(await parseRequestKyc(el.description)),
          id: el.id,
          address: el.misc,
          status: el.status,
          rejectReason: el.rejectReason,
          timestamp: Number(el.timestamp),
        })),
      ),
    )
  }

  const loadRejectedKyc = async () => {
    const { data } = await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
      query: GetUserKycRequestsByStatus,
      fetchPolicy: 'network-only',
      variables: {
        status: RequestsStatuses.REJECTED,
      },
    })

    if (!data.requests?.length) return

    setRejectedKyc(
      await Promise.all(
        data!.requests!.map(async el => ({
          ...(await parseRequestKyc(el.description)),
          id: el.id,
          address: el.misc,
          status: el.status,
          rejectReason: el.rejectReason,
          timestamp: Number(el.timestamp),
        })),
      ),
    )
  }

  const loadAllKyc = async () => {
    setIsLoading(true)
    setIsLoadingError(false)
    try {
      const addr = await coreContracts.getContractAddressByName('KYC_REQUESTS')
      await Promise.all([
        loadKycRequests(addr),
        loadActualKyc(),
        loadPendingKyc(),
        loadRejectedKyc(),
      ])
    } catch (e) {
      setIsLoadingError(true)
      console.error(e)
    }
    setIsLoading(false)
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
        requestType: kycBlob.rawData?.requestType,
        email: kycBlob.rawData?.email,
        companyAddress: kycBlob.rawData?.companyAddress,
        companyName: kycBlob.rawData?.companyName,
        companyMainActivity: kycBlob.rawData?.companyMainActivity,
        DID: kycBlob.rawData?.DID,
      } as Kyc
    } catch (error) {
      return {
        firstName: '',
        lastName: '',
        passportSerialNumber: '',
        passportIssuanceDate: '',
        requestType: '',
        email: '',
        companyAddress: '',
        companyName: '',
        DID: '',
      } as Kyc
    }
  }

  const acceptRequest = async (requestId: string) => {
    setIsSubmitting(true)
    await _acceptRequest(requestId)
    setIsSubmitting(false)
  }

  const dropRequest = async (requestId: string) => {
    setIsSubmitting(true)
    await _dropRequest(requestId)
    setIsSubmitting(false)
  }

  const rejectRequest = async (requestId: string, reason: string) => {
    setIsSubmitting(true)
    await _rejectRequest(requestId, reason)
    setIsSubmitting(false)
  }

  return {
    isSubmitting,

    filters,

    kyc,
    kycList,
    actualKyc,
    pendingKyc,
    rejectedKyc,

    loadKycRequests,
    loadAllKyc,
    loadKycRequest,

    acceptRequest,
    dropRequest,
    rejectRequest,
    setKycList,

    isLoading,
    isLoadingError,
  }
}
