import './styles.scss'

import { motion, MotionProps } from 'framer-motion'
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const Roles: FC<Props> = ({ ...rest }) => {
  const { t } = useTranslation()
  return (
    <motion.main className='roles-page' {...rest}>
      <h3 className='roles-page__title'>{t('roles-page.title')}</h3>
      <p className='roles-page__desc'>{t('roles-page.desc')}</p>
    </motion.main>
  )
}

export default Roles
