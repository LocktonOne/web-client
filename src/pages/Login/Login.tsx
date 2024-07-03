import './styles.scss'

import { motion, MotionProps } from 'framer-motion'
import { FC, HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const Login: FC<Props> = ({ ...rest }) => {
  return (
    <motion.main className='login-page' {...rest}>
      Locktone One
    </motion.main>
  )
}

export default Login
