import './styles.scss'

import { motion, MotionProps } from 'framer-motion'
import { FC, HTMLAttributes } from 'react'

import AdminLoginForm from '@/forms/AdminLoginForm'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const AdminLogIn: FC<Props> = ({ ...rest }) => {
  return (
    <motion.main className='admin-login-page' {...rest}>
      <div className='admin-login-page__bg' />
      <div className='admin-login-page__form'>
        <AdminLoginForm />
      </div>
    </motion.main>
  )
}

export default AdminLogIn
