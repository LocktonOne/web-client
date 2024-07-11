import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
type Props = HTMLAttributes<HTMLDivElement>

const Users = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles title={t('users-page.title')} subtitle={t('users-page.subtitle')} />
    </Stack>
  )
}

export default Users
