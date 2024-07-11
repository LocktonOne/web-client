import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
type Props = HTMLAttributes<HTMLDivElement>

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles title={t('roles-page.title')} subtitle={t('roles-page.subtitle')} />
    </Stack>
  )
}

export default Roles
