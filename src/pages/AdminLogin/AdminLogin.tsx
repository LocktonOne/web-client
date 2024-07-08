import { Grid } from '@mui/material'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'

import bg from '@/assets/illustrations/bg.webp'
import AdminLoginForm from '@/forms/AdminLoginForm'
import { vh } from '@/theme/helpers'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const AdminLogin = ({ ...rest }: Props) => {
  return (
    <motion.main {...rest}>
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
    </motion.main>
  )
}

export default AdminLogin
