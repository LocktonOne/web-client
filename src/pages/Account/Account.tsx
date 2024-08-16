import { IconButton, Stack, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PageTitles } from '@/common'
import { Icons } from '@/enums'
import { coreContracts, useKycManagement } from '@/modules/sdk'
import { web3Store } from '@/store'
import { UiIcon } from '@/ui'

import { AccountInformation } from './components'

const Account = () => {
  const { t } = useTranslation()
  const { palette } = useTheme()
  const router = useNavigate()
  const { loadKycRequest, kyc } = useKycManagement()

  const loadData = async () => {
    try {
      await loadKycRequest(web3Store.provider?.address?.toLowerCase() ?? '')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <AccountInformation address={coreContracts.provider.address!} userInfo={kyc} />
      </Stack>
    </Stack>
  )
}

export default Account
