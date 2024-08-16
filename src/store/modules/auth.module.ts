import { createStore } from '@/helpers'

export type AuthTokensGroup = {
  id: string
  type: 'token'
  accessToken: string
  refreshToken: string
}

type AuthState = {
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    tokens: {},
  } as AuthState,
  state => ({
    addTokensGroup: (authTokensGroup: AuthTokensGroup) => {
      state.tokens = {
        accessToken: authTokensGroup.accessToken,
        refreshToken: authTokensGroup.refreshToken,
      }
    },
  }),
)

export { authStore, useAuthState }
