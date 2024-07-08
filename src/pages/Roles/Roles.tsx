import { Typography } from '@mui/material'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <motion.main {...rest}>
      <Typography>{t('roles-page.title')}</Typography>
      <Typography>{t('roles-page.desc')}</Typography>
    </motion.main>
  )
}

export default Roles
