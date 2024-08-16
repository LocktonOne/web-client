import { useRef, useState } from 'react'

import { createKycRequestsContracts } from '@/modules/sdk'

import { coreContracts } from '../globals'

export const useKycUser = () => {
  const contractAddress = useRef('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadFailed, setIsLoadedFailed] = useState(false)

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

  const usersRequestInfo = async (addr?: string) => {
    const kycRequestsContract = createKycRequestsContracts(
      contractAddress.current,
      coreContracts.rawProvider,
      coreContracts.provider,
    )

    return kycRequestsContract.getUserRequestInfo(addr ?? coreContracts.provider.address!)
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

    init,

    setIsLoaded,
    setIsLoadedFailed,

    dropKYCRequest,
    requestKYCRole,
    usersRequestInfo,
  }
}
