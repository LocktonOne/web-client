import { config } from '@config'
import { PROVIDERS } from '@distributedlab/w3p'
import { CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo, useEffect, useMemo, useState } from 'react'

import { initApi } from '@/api/clients'
import { bearerAttachInterceptor, refreshTokenInterceptor } from '@/api/interceptors'
import { ToastsManager } from '@/contexts'
import { ErrorHandler } from '@/helpers'
import { useAdminAuth, useAuth, useViewportSizes } from '@/hooks'
import { coreContracts, init as initGraph, initCoreContracts } from '@/modules/sdk'
import { AppRoutes } from '@/routes'
import { identityStore, useUiState, walletStore, web3Store } from '@/store'
import { createTheme } from '@/theme'

const App: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { paletteMode } = useUiState()
  const { getAccessToken, refreshAccessToken, logout, isLoggedIn } = useAuth()
  const { isAuthorized } = useAdminAuth()

  useViewportSizes()

  const theme = useMemo(() => createTheme(paletteMode), [paletteMode])

  const init = async () => {
    try {
      initApi(config.API_URL, [
        {
          request: bearerAttachInterceptor(getAccessToken),
          error: refreshTokenInterceptor(getAccessToken, refreshAccessToken, logout),
        },
      ])
      initGraph()
      if (!web3Store.provider?.address && (isLoggedIn || isAuthorized)) {
        if (identityStore.privateKey) {
          await web3Store.init('wallet')
        } else if (walletStore.metamaskAddress) {
          await web3Store.init(PROVIDERS.Metamask)
        }
      }
      if (web3Store.provider.address) {
        await initCoreContracts(web3Store.provider, web3Store.provider.rawProvider!)
        await coreContracts.loadCoreContractsAddresses()
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastsManager>
        <div className='App'>
          {isAppInitialized ? (
            <AppRoutes />
          ) : (
            <Stack alignItems='center' justifyContent='center' flex={1}>
              <CircularProgress color='secondary' />
            </Stack>
          )}
        </div>
      </ToastsManager>
    </ThemeProvider>
  )
}

export default memo(App)
