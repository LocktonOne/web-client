import { Stack } from '@mui/material'
import { PropsWithChildren } from 'react'

import { AdminNavbar } from '@/common'
import { vh } from '@/theme/helpers'

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack direction='row' spacing={4} height={vh(100)} width='100%'>
      <AdminNavbar />
      <Stack py={10} flex={1} overflow='hidden auto' sx={{ px: { sm: 4, md: 0 } }}>
        <Stack mx='auto' width='100%'>
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AdminLayout
