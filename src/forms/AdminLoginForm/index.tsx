import { PROVIDERS } from '@distributedlab/w3p'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useAdminAuth } from '@/hooks'
import { UiIcon } from '@/ui'

const AdminLoginForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()
  const { authorize } = useAdminAuth()

  const tryConnect = async (providerType: PROVIDERS) => {
    try {
      await authorize(providerType)
      bus.emit(BusEvents.success, { message: 'Success log in' })
    } catch (error) {
      ErrorHandler.process(error)
    }
  }

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={spacing(6)}>
      <UiIcon name={Icons.UserCircle} size={15} />
      <Stack sx={{ alignItems: 'center' }} gap={1}>
        <Typography variant='h5'>{t('login-form.admin-title')}</Typography>
      </Stack>
      <Button
        variant='contained'
        fullWidth
        sx={{
          background: palette.primary.dark,
          fontWeight: typography.fontWeightBold,
        }}
        onClick={() => tryConnect(PROVIDERS.Metamask)}
      >
        {t('login-form.admin-login-btn')}
      </Button>
    </Stack>
  )
}

export default AdminLoginForm
