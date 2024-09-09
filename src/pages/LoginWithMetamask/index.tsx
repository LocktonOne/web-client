import { Button, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import bg from '@/assets/illustrations/login-bg.webp'
import { Icons } from '@/enums'
import { useAuth } from '@/hooks'
import { vh } from '@/theme/helpers'
import { UiIcon } from '@/ui'

const LoginWithMetamask = () => {
  const { t } = useTranslation()
  const { loginWithMetamask } = useAuth()

  return (
    <Stack>
      <Grid container height={vh(100)}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          }}
        />
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={6}>
            <UiIcon name={Icons.UserCircle} size={15} />
            <Stack sx={{ alignItems: 'center' }} gap={1}>
              <Typography variant='h5'>{t('login-form.metamask-title')}</Typography>
            </Stack>
            <Button onClick={() => loginWithMetamask()}>
              <UiIcon name={Icons.Metamask} sx={{ mr: 2 }} />
              {t('login-form.submit-btn')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default LoginWithMetamask
