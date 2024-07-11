import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
type Props = HTMLAttributes<HTMLDivElement>

const KycRequests = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles title={t('kyc-requests-page.title')} subtitle={t('kyc-requests-page.subtitle')} />
    </Stack>
  )
}

export default KycRequests
