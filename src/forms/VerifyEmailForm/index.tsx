import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { verifyEmail } from '@/api/modules'
import { getAuthPair } from '@/api/modules/doorman'
import { VerificationCodeInput } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { coreContracts } from '@/modules/sdk'
import { authStore, walletStore } from '@/store'
import { UiIcon } from '@/ui'

const VerifyEmailForm = () => {
  const { t } = useTranslation()
  const router = useNavigate()
  const { palette, typography, spacing } = useTheme()

  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [verificationCode, setVerificationCode] = useState('')

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerificationCodeChange = (code: string) => {
    setVerificationCode(code)
  }

  const handleSubmit = async () => {
    try {
      await verifyEmail(walletStore.walletId!, verificationCode)
      const tokens = await getAuthPair(coreContracts.provider.address ?? '')
      authStore.addTokensGroup({ id: '', type: 'token', ...tokens })
      router(RoutePaths.Dashboard)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 54,
        paddingTop: 10,
        paddingBottom: 20,
        bgcolor: palette.background.tertiary,
        border: `1px solid ${palette.border.main}`,
        borderRadius: 6,
        zIndex: 1,
      }}
      gap={spacing(10)}
    >
      <UiIcon name={Icons.CompanyLogo} size={40} sx={{ height: 60, minHeight: 60 }} />
      <Stack sx={{ alignItems: 'center' }} gap={1}>
        <Typography variant='h5' fontWeight='bold' mb={2}>
          {t('verify-email-form.title')}
        </Typography>
        <Typography variant='body1' align='center' mb={4} width={550}>
          {t('verify-email-form.time') + formatTime(timeLeft)}
        </Typography>
      </Stack>
      <VerificationCodeInput onChange={handleVerificationCodeChange} />
      <Button
        variant='contained'
        sx={{
          background: palette.primary.dark,
          px: 10,
          fontWeight: typography.fontWeightBold,
          mt: 12,
        }}
        onClick={handleSubmit}
      >
        {t('verify-email-form.submit-btn')}
      </Button>
    </Stack>
  )
}

export default VerifyEmailForm
