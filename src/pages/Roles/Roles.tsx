import { Stack, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
type Props = HTMLAttributes<HTMLDivElement>

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack {...rest}>
      <Typography>{t('roles-page.title')}</Typography>
      <Typography>{t('roles-page.desc')}</Typography>
    </Stack>
  )
}

export default Roles
