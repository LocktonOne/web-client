import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
type Props = HTMLAttributes<HTMLDivElement>

const Administrators = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles
        title={t('administrators-page.title')}
        subtitle={t('administrators-page.subtitle')}
      />
    </Stack>
  )
}

export default Administrators
