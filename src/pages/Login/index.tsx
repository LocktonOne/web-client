import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import bg from '@/assets/illustrations/login-bg.webp'
import { RoutePaths } from '@/enums'
import LoginForm from '@/forms/LoginForm'

const Login = () => {
  const { t } = useTranslation()
  const { palette } = useTheme()

  return (
    <Stack height='100%' bgcolor={palette.background.paper}>
      <Box sx={{ px: 15, py: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box component='img' src='/branding/logo.svg' />
        <Stack direction='row'>
          <Typography variant='body3' sx={{ color: palette.primary.light }}>
            {t('login.header-text')}
          </Typography>
          <Typography
            component={NavLink}
            to={RoutePaths.Register}
            variant='body3'
            sx={{ textDecoration: 'underline', color: palette.primary.main, ml: 2 }}
          >
            {t('login.register')}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          position: 'absolute',
          height: 600,
          width: 1000,
          top: '20%',
          left: '20%',
          opacity: '60%',
        }}
      />
      <Stack sx={{ alignItems: 'center', height: '100%', mt: 20 }}>
        <LoginForm />
      </Stack>
    </Stack>
  )
}

export default Login
