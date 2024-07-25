import { IconButton, Stack, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AccountInformation, PageTitles } from '@/common'
import { Icons } from '@/enums'
import { useWalletState } from '@/store'
import { UiIcon } from '@/ui'

const userInfo = {
  type: 'Personal',
  firstName: 'Test',
  lastName: 'Testovskii',
  passportNumber: 'TY78747584758',
  passportDate: '01/49',
  DID: 'did: okkd2ii3221jkjfdj',
}

const Account = () => {
  const { t } = useTranslation()
  const { palette } = useTheme()
  const router = useNavigate()
  const { wallet } = useWalletState()

  return (
    <Stack sx={{ alignItems: 'flex-start', py: 10, px: 15 }}>
      <Stack sx={{ alignItems: 'flex-start', justifyContent: 'center' }} direction='row' gap={4}>
        <IconButton aria-label='back' onClick={() => router(-1)}>
          <UiIcon name={Icons.ArrowLeft} size={6} color={palette.primary.dark} />
        </IconButton>
        <PageTitles
          title={t('account-page.title')}
          subtitle={t('account-page.subtitle')}
          variant='h4'
        />
      </Stack>
      <Stack>
        <AccountInformation address={wallet?.id ?? ''} userInfo={userInfo} />
      </Stack>
    </Stack>
  )
}

export default Account
