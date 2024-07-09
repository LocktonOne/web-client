import { Grid, Stack } from '@mui/material'
import { HTMLAttributes } from 'react'

import bg from '@/assets/illustrations/registration-bg.webp'
import AdminLoginForm from '@/forms/AdminLoginForm'
import { vh } from '@/theme/helpers'
type Props = HTMLAttributes<HTMLDivElement>

const AdminLogin = ({ ...rest }: Props) => {
  return (
    <Stack {...rest}>
      <Grid container height={vh(100)}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          }}
        />
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <AdminLoginForm />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AdminLogin
