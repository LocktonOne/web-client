import { Stack, StackProps, Typography } from '@mui/material'

import { UserAvatar } from '@/common'
import { Icons } from '@/enums'
import { FontWeight } from '@/theme/constants'
import { UiIcon } from '@/ui'

type Props = StackProps & {
  email: string
  name: string
  type: 'admin' | 'user'
}

export default function ProfileMenu({ email, type, name, ...rest }: Props) {
  return (
    <Stack {...rest} flexDirection='row' gap={4} justifyContent='center' alignItems='center' p={2}>
      <UserAvatar userDid='mock' size={10} />
      <Stack justifyContent='center'>
        <Typography variant='body3' fontWeight={FontWeight.Medium}>
          {email}
        </Typography>
        <Typography variant='caption2'>{name}</Typography>
      </Stack>
      {type === 'user' && <UiIcon name={Icons.CaretRight} size={4} sx={{ ml: 10 }} />}
    </Stack>
  )
}
