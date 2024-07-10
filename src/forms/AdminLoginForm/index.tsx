import { PROVIDERS } from '@distributedlab/w3p'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, getAuthNonce, sleep } from '@/helpers'
import { useAuth } from '@/hooks'
import { web3Store } from '@/store'
import { UiIcon } from '@/ui'

const AdminLoginForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()
  const { login } = useAuth()

  const tryConnect = async (providerType: PROVIDERS) => {
    try {
      await web3Store.connect(providerType)

      if (!web3Store.provider?.address) {
        await sleep(1000)
      }

      if (web3Store.provider?.address) {
        const authNonce = await getAuthNonce(web3Store.provider.address)
        const signedMessage = await web3Store.provider.signMessage(authNonce)
        await login(web3Store.provider.address, signedMessage!)
        bus.emit(BusEvents.success, { message: 'Succes log in' })
        return
      }

      throw new Error('Provider address is undefined')
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
