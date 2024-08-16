import { useState } from 'react'

import { coreApolloClient } from '../api'
import {
  GetUserById,
  type GetUserByIdQuery,
  GetUsersByIdPaginated,
  GetUsersByRoleIdsPaginated,
  type UserCommonFieldsFragment,
} from '../types'

export const useUsers = (defaultFilters?: {
  id?: string
  offset?: number
  limit?: number
  roleIds?: string[]
}) => {
  const filters = {
    id: defaultFilters?.id || '',
    offset: defaultFilters?.offset || 0,
    limit: defaultFilters?.limit || 10,
    roleIds: defaultFilters?.roleIds || [],
  }

  const [users, setUsers] = useState<UserCommonFieldsFragment[]>([])
  const [user, setUser] = useState<UserCommonFieldsFragment>()

  const loadUsers = async () => {
    const { data } = await coreApolloClient.query({
      query: filters.roleIds?.length ? GetUsersByRoleIdsPaginated : GetUsersByIdPaginated,
      fetchPolicy: 'network-only',
      variables: {
        id: filters.id,
        offset: filters.offset,
        limit: filters.limit,
        roleIds: filters.roleIds,
      },
    })

    setUsers(data.users)
  }

  const loadUser = async () => {
    const { data } = await coreApolloClient.query<GetUserByIdQuery>({
      query: GetUserById,
      fetchPolicy: 'network-only',
      variables: {
        id: filters.id,
      },
    })

    if (!data.user) return

    setUser(data.user)
  }

  return {
    filters,

    isLoaded,
    isLoadFailed,

    users,
    user,

    loadUsers,
    loadUser,
  }
}
