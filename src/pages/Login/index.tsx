import { Stack, useTheme } from '@mui/material'

import LoginForm from '@/forms/LoginForm'

const Login = () => {
  const { palette } = useTheme()

  return (
    <Stack height='100%' bgcolor={palette.background.additional}>
      <Stack sx={{ alignItems: 'center', height: '100%', mt: 20 }}>
        <LoginForm />
      </Stack>
    </Stack>
  )
}

export default Login
