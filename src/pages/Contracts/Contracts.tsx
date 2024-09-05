import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
import AllowContractForm from '@/forms/AllowContractForm'

type Props = HTMLAttributes<HTMLDivElement>

const Contracts = ({ ...rest }: Props) => {
  const { t } = useTranslation()

  return (
    <Stack {...rest} alignItems='flex-start' pr={10}>
      <PageTitles title={t('contracts-page.title')} subtitle={t('contracts-page.subtitle')} />
      <Stack direction='column' mt={10} justifyContent='space-between' width='100%'>
        <AllowContractForm />
      </Stack>
    </Stack>
  )
}

export default Contracts
