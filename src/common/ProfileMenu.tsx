import { Stack, Typography } from '@mui/material'

import { UserAvatar } from '@/common'

export default function ProfileMenu() {
  return (
    <>
      <Stack flexDirection='row' gap={4}>
        <UserAvatar userDid='mock' size={10} />
        <Stack>
          <Typography variant='body3'>adminsmail@gmail.com</Typography>
          <Typography variant='caption2'>Master Admin</Typography>
        </Stack>
      </Stack>
    </>
  )
}
