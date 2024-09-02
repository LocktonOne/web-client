import { CircularProgress, Stack, Tab, Tabs, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { PageTitles, ProfileMenu } from '@/common'
import { tokensListContext } from '@/contexts'
import { Roles, RoutePaths } from '@/enums'
import { useAuth, useTokens } from '@/hooks'
import { useKycManagement } from '@/modules/sdk'
import { web3Store } from '@/store'

import { DeployedContracts, UserBalance } from './components'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation()
  const { palette } = useTheme()
  const { loadTokens, isLoading, tokensList, setTokensList, setIsLoading } = useTokens()
  const { role, getRoles } = useAuth()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const { loadKycRequest, kyc } = useKycManagement()

  const loadData = async () => {
    try {
      await loadTokens()
      await loadKycRequest(web3Store.provider?.address?.toLowerCase() ?? '')
      await getRoles()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack sx={{ alignItems: 'center', py: 10, px: 15 }}>
      <Stack direction='row' justifyContent='space-between' width='100%'>
        <PageTitles
          title={t('dashboard-page.title')}
          subtitle={`${t('dashboard-page.subtitle')}, ${role === Roles.UNVERIFIED ? 'Unverified User!' : (kyc?.firstName ?? kyc?.companyName)}`}
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
            name={`${role} User`}
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
      <Stack direction='row' minHeight={300} mt={6} gap={5} width='100%'>
        {!isLoading ? (
          <tokensListContext.Provider
            value={{ setTokensList, setIsLoading, isLoading, tokensList, loadTokens }}
          >
            <UserBalance />
            {role === Roles.CORPORATE && <DeployedContracts />}
          </tokensListContext.Provider>
        ) : (
          <Stack
            sx={{ width: '100%', height: 500, alignItems: 'center', justifyContent: 'center' }}
          >
            <CircularProgress />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default Dashboard
