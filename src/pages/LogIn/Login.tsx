import './styles.scss'

import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const Login = ({ ...rest }: Props) => {
  return (
    <motion.main className='login-page' {...rest}>
      Locktone One
    </motion.main>
  )
}

export default Login
