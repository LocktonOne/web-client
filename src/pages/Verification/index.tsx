import { Stack, useTheme } from '@mui/material'

import VerifyEmailForm from '@/forms/VerifyEmailForm'

const Verification = () => {
  const { palette } = useTheme()

  return (
    <Stack height='100%' bgcolor={palette.background.additional}>
      <Stack sx={{ alignItems: 'center', height: '100%', mt: 20 }}>
        <VerifyEmailForm />
      </Stack>
    </Stack>
  )
}

export default Verification
