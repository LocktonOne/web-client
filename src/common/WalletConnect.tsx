import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'

import { Icons } from '@/enums'
import { useAuth } from '@/hooks'
import { UiIcon } from '@/ui'

export default function WalletConnect() {
  const { palette } = useTheme()
  const { loginWithMetamask } = useAuth()

  return (
    <Stack>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        position='relative'
        my={6}
      >
        <Divider sx={{ width: '100%' }}>
          <Typography variant='body4'>or</Typography>
        </Divider>
      </Stack>
      <Stack alignItems='center'>
        <Typography variant='body3' color={palette.text.secondary}>
          Sign In through the wallet extension
        </Typography>
      </Stack>

      <Stack direction='row' gap={4} mt={4}>
        <Button
          onClick={() => loginWithMetamask()}
          sx={{
            backgroundColor: palette.background.additional,
            borderColor: palette.border.dark,
            color: palette.text.primary,
          }}
        >
          <UiIcon name={Icons.Metamask} sx={{ mr: 2 }} />
          Metamask Wallet
        </Button>
        <Button
          sx={{
            backgroundColor: palette.background.additional,
            borderColor: palette.border.dark,
            color: palette.text.primary,
          }}
        >
          <UiIcon name={Icons.WalletFilled} sx={{ mr: 2 }} />
          LoctonOne Wallet
        </Button>
      </Stack>
    </Stack>
  )
}
