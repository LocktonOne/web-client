import { config } from '@config'
import { PROVIDERS } from '@distributedlab/w3p'
import { CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { initApi } from '@/api/clients'
import { bearerAttachInterceptor, refreshTokenInterceptor } from '@/api/interceptors'
import { ToastsManager } from '@/contexts'
import { ErrorHandler } from '@/helpers'
import { useAuth, useViewportSizes } from '@/hooks'
import { init as initGraph, initCoreContracts } from '@/modules/sdk'
import { AppRoutes } from '@/routes'
import { useUiState, web3Store } from '@/store'
import { createTheme } from '@/theme'

const App: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { paletteMode } = useUiState()
  const { getAccessToken, refreshAccessToken, logout } = useAuth()

  useViewportSizes()

  const init = useCallback(async () => {
    try {
      initApi(config.API_URL, [
        {
          request: bearerAttachInterceptor(getAccessToken),
          error: refreshTokenInterceptor(getAccessToken, refreshAccessToken, logout),
        },
      ])
      if (!web3Store.provider?.address) {
        await web3Store.connect(PROVIDERS.Metamask)
      }
      initGraph()
      await initCoreContracts(web3Store.provider!, web3Store.provider!.rawProvider!)
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [getAccessToken, logout, refreshAccessToken])

  const theme = useMemo(() => createTheme(paletteMode), [paletteMode])

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
