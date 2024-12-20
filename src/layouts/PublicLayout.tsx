import { Stack, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

import { vh } from '@/theme/helpers'

const PublicLayout = ({ children }: PropsWithChildren) => {
  const { palette } = useTheme()

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height={vh(100)}
      width='100%'
      bgcolor={palette.background.default}
    >
      <Stack flex={1} overflow='hidden auto' width='100%'>
        <Stack mx='auto' width='100%' height='100%'>
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicLayout
