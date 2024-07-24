import { Stack, Tab, Tabs, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { PageTitles, ProfileMenu } from '@/common'
import { RoutePaths } from '@/enums'
import { useWalletState } from '@/store'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation()
  const { palette } = useTheme()
  const { wallet } = useWalletState()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Stack sx={{ alignItems: 'center', py: 10, px: 15 }}>
      <Stack direction='row' justifyContent='space-between' width='100%'>
        <PageTitles
          title={t('dashboard-page.title')}
          subtitle={t('dashboard-page.title')}
          variant='h4'
        />
        <NavLink to={RoutePaths.Account}>
          <ProfileMenu
            sx={{
              border: '1px solid',
              borderColor: palette.action.active,
              borderRadius: 2,
              color: palette.primary.dark,
            }}
            type='user'
            email={wallet?.email ?? ''}
            name='Unverified User'
          />
        </NavLink>
      </Stack>
      <Stack width='100%' mt={8} alignItems='start'>
        <Tabs onChange={handleChange} value={activeTab}>
          <Tab label='1 year' />
          <Tab label='1 month' />
          <Tab label='7 days' />
          <Tab label='24 hours' />
        </Tabs>
      </Stack>
    </Stack>
  )
}

export default Dashboard
