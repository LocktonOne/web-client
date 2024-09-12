import { RequestsStatuses } from '@/enums'
import { coreApolloClient, GetRolesWithResources, GetRolesWithResourcesQuery } from '@/modules/sdk'

export const getListRoles = async () => {
  const { data } = await coreApolloClient.query<GetRolesWithResourcesQuery>({
    query: GetRolesWithResources,
    fetchPolicy: 'network-only',
    variables: {
      status: RequestsStatuses.ACCEPTED,
    },
  })
  return data
}
