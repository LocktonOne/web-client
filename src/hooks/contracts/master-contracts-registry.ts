import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'
import { useMemo } from 'react'

import { MasterContractsRegistry__factory } from '@/types'

export const useMasterContractsRegistry = (
  contractAddress: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  // TODO: fix network
  const providerInstance = useMemo(
    () =>
      provider.providerType !== PROVIDERS.Fallback
        ? new providers.Web3Provider(rawProvider as providers.ExternalProvider, 1337)
        : (rawProvider as unknown as providers.JsonRpcProvider),
    [provider.providerType, rawProvider],
  )

  const contractInstance = useMemo(
    () =>
      (!!providerInstance &&
        MasterContractsRegistry__factory.connect(contractAddress, providerInstance)) ||
      undefined,
    [contractAddress, providerInstance],
  )

  const getContractAddressByName = async (name: string) => {
    return contractInstance?.getContract(name)
  }

  const getMasterAccessManagement = async () => {
    return contractInstance?.getMasterAccessManagement()
  }

  const getConstantsRegistry = async () => {
    return contractInstance?.getConstantsRegistry()
  }

  const getReviewableRequests = async () => {
    return contractInstance?.getReviewableRequests()
  }

  return {
    getMasterAccessManagement,
    getConstantsRegistry,
    getReviewableRequests,

    getContractAddressByName,
  }
}
