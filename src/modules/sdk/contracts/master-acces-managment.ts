import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'

import { createContract, increaseGasLimit } from '../helpers'
import { MasterAccessManagement__factory as MasterAccessManagement } from '../types'
import { IRBAC } from '../types/contracts/MasterAccessManagement'

export const createMasterAccessManagement = (
  address: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  const { contractInstance, contractInterface } = createContract(
    address,
    rawProvider,
    MasterAccessManagement,
  )

  const providerInstance =
    provider.providerType !== PROVIDERS.Fallback
      ? new providers.Web3Provider(rawProvider as providers.ExternalProvider, 'any')
      : (rawProvider as unknown as providers.JsonRpcProvider)

  return {
    contractInstance,
    contractInterface,

    addCombinedPermissionsToRole: async (
      role: string,
      description: string,
      allowedPermissions: IRBAC.ResourceWithPermissionsStruct[],
      disallowedPermissions: IRBAC.ResourceWithPermissionsStruct[],
    ) => {
      const data = contractInterface.encodeFunctionData('addCombinedPermissionsToRole', [
        role,
        description,
        allowedPermissions,
        disallowedPermissions,
      ])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },

    removePermissionsFromRole: async (
      role: string,
      permissionsToRemove: IRBAC.ResourceWithPermissionsStruct[],
      allowed: boolean,
    ) => {
      const data = contractInterface.encodeFunctionData('removePermissionsFromRole', [
        role,
        permissionsToRemove,
        allowed,
      ])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },

    updateRolePermissions: async (
      role: string,
      description: string,
      allowedToRemove: IRBAC.ResourceWithPermissionsStruct[],
      disallowedToRemove: IRBAC.ResourceWithPermissionsStruct[],
      allowedToAdd: IRBAC.ResourceWithPermissionsStruct[],
      disallowedToAdd: IRBAC.ResourceWithPermissionsStruct[],
    ) => {
      const data = contractInterface.encodeFunctionData('updateRolePermissions', [
        role,
        description,
        allowedToRemove,
        disallowedToRemove,
        allowedToAdd,
        disallowedToAdd,
      ])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },

    grantRoles: async (to: string, roles: string[]) => {
      const data = contractInterface.encodeFunctionData('grantRoles', [to, roles])

      const txBody = {
        to: address,
        data,
      }
      // TODO: Fix gas limit
      return provider.signAndSendTx({
        ...txBody,
        gasLimit: 250000,
      })
    },

    revokeRoles: async (from: string, roles: string[]) => {
      const data = contractInterface.encodeFunctionData('revokeRoles', [from, roles])

      const txBody = {
        to: address,
        data,
      }

      return provider.signAndSendTx({
        ...txBody,
        gasLimit: await increaseGasLimit(provider.address!, providerInstance, txBody, 1.5),
      })
    },

    getUserRoles: async (addr: string) => {
      return contractInstance.getUserRoles(addr)
    },

    getMasterRoleId: async () => {
      return contractInstance.MASTER_ROLE()
    },

    getBannedRoleId: async () => {
      return 'BANNED' // FIXME
    },
  }
}
