import { Grid, IconButton, Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PageTitles } from '@/common'
import { Icons } from '@/enums'
import KycCompanyForm from '@/forms/KycCompanyForm'
import KycPersonalForm from '@/forms/KycPersonalForm'
import { SuccessKYCModal } from '@/modals'
import { UiIcon } from '@/ui'

const Kyc = () => {
  const [isPersonalFormActive, setIsPersonalFormActive] = useState(true)
  const [isSuccessKYCModalOpen, setIsSuccessKYCModalOpen] = useState(false)
  const { t } = useTranslation()
  const { palette } = useTheme()
  const router = useNavigate()

  return (
    <Stack sx={{ alignItems: 'flex-start', py: 10, px: 15 }}>
      <Stack sx={{ alignItems: 'flex-start', justifyContent: 'center' }} direction='row' gap={4}>
        <IconButton aria-label='back' onClick={() => router(-1)}>
          <UiIcon name={Icons.ArrowLeft} size={6} color={palette.primary.dark} />
        </IconButton>
        <PageTitles title={t('kyc-page.title')} subtitle={t('kyc-page.subtitle')} variant='h4' />
      </Stack>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <KycPersonalForm
            isActive={isPersonalFormActive}
            handleChange={() => setIsPersonalFormActive(true)}
            openSuccessModal={() => setIsSuccessKYCModalOpen(true)}
          />
        </Grid>
        <Grid item xs={6}>
          <KycCompanyForm
            isActive={!isPersonalFormActive}
            handleChange={() => setIsPersonalFormActive(false)}
            openSuccessModal={() => setIsSuccessKYCModalOpen(true)}
          />
        </Grid>
      </Grid>
      <SuccessKYCModal
        isOpen={isSuccessKYCModalOpen}
        handleClose={() => setIsSuccessKYCModalOpen(false)}
      />
    </Stack>
  )
}

export default Kyc
