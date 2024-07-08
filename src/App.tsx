import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import { AppNavbar } from '@/common'
import { bus, BUS_EVENTS } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'
import { useUiState } from '@/store'
import { createTheme } from '@/theme'

export const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const { showToast } = useNotification()
  const { paletteMode } = useUiState()

  const theme = useMemo(() => createTheme(paletteMode), [paletteMode])

  useEffect(() => {
    const showSuccessToast = (payload: unknown) => showToast('success', payload)
    const showWarningToast = (payload: unknown) => showToast('warning', payload)
    const showErrorToast = (payload: unknown) => showToast('error', payload)
    const showInfoToast = (payload: unknown) => showToast('info', payload)

    bus.on(BUS_EVENTS.success, showSuccessToast)
    bus.on(BUS_EVENTS.warning, showWarningToast)
    bus.on(BUS_EVENTS.error, showErrorToast)
    bus.on(BUS_EVENTS.info, showInfoToast)

    return () => {
      bus.off(BUS_EVENTS.success, showSuccessToast)
      bus.off(BUS_EVENTS.warning, showWarningToast)
      bus.off(BUS_EVENTS.error, showErrorToast)
      bus.off(BUS_EVENTS.info, showInfoToast)
    }
  }, [showToast])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNavbar />
      {children}

      <ToastContainer />
    </ThemeProvider>
  )
}
