import { Stack, useTheme } from '@mui/material'

import RegisterForm from '@/forms/RegisterForm'

const Register = () => {
  const { palette } = useTheme()

  return (
    <Stack height='100%' bgcolor={palette.background.additional}>
      <Stack sx={{ alignItems: 'center', height: '100%', mt: 20 }}>
        <RegisterForm />
      </Stack>
    </Stack>
  )
}

export default Register
