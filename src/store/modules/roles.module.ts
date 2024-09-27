import { createStore } from '@/helpers'

type rolesState = {
  roles: string[]
}

const [rolesStore, useRolesState] = createStore(
  'roles',
  {
    roles: [''],
  } as rolesState,
  () => ({}),
  state => ({
    addRoles(roles: string[]) {
      state.roles = roles
    },
  }),
)

export { rolesStore, useRolesState }
