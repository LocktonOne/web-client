import { Button, Stack, StackProps, Typography, useTheme } from '@mui/material'

import { UserAvatar } from '@/common'
import { Icons } from '@/enums'
import { useAuth } from '@/hooks'
import { UiIcon } from '@/ui'

type Props = StackProps & {
  name: string
  type: 'admin' | 'user'
}

export default function ProfileMenu({ type, name, ...rest }: Props) {
  const { logout } = useAuth()
  const { palette } = useTheme()

  return (
    <Stack {...rest} flexDirection='row' gap={4} justifyContent='center' alignItems='center' p={2}>
      <UserAvatar userDid='mock' size={10} />
      <Stack justifyContent='center' alignItems='flex-start'>
        <Typography variant='caption2'>{name}</Typography>
        {type === 'user' && (
          <Button
            sx={{
              color: palette.secondary.main,
              bgcolor: 'transparent',
              justifyContent: 'flex-start',
              p: 0,
              '&:hover': {
                bgcolor: 'transparent',
                borderColor: palette.action.hover,
                color: palette.secondary.light,
              },
            }}
            size='small'
            onClick={() => logout()}
          >
            Logout
            <UiIcon name={Icons.Logout} sx={{ ml: 2 }} size={4} />
          </Button>
        )}
      </Stack>
      {type === 'user' && <UiIcon name={Icons.CaretRight} size={4} sx={{ ml: 10 }} />}
    </Stack>
  )
}
