import { Grid, IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
import { Icons } from '@/enums'
import { RoleCard } from '@/pages/Roles/components'
import { UiIcon, UiTextField } from '@/ui'
type Props = HTMLAttributes<HTMLDivElement>

const ROLES = [
  {
    title: 'KYC Administrator',
    desc: 'This role is responsible for performing KYC procedures for any role that is needed to confirm his identity.',
    permissions: [
      'Verify the correctness of the role’s provided data',
      'Accept initial KYC requests',
    ],
  },
  {
    title: 'Physical User',
    desc: 'This role is responsible for performing KYC procedures for any role that is needed to confirm his identity.',
    permissions: ['Transfer ERC-20 tokens'],
  },
  {
    title: 'Corporate User',
    desc: 'This role represents the Corporate legal entity of any country.',
    permissions: ['Transfer ERC-20 tokens', 'Deploy ERC-20 contracts'],
  },
]

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  const { palette } = useTheme()

  return (
    <Stack {...rest} alignItems='flex-start' pr={10}>
      <PageTitles title={t('roles-page.title')} subtitle={t('roles-page.subtitle')} />
      <Stack direction='column' mt={10} justifyContent='space-between' width='100%'>
        <Stack direction='row' gap={3}>
          <UiTextField
            placeholder={t('roles-page.search')}
            sx={{ '& .MuiInputBase-root': { minHeight: 52 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <UiIcon componentName='search' sx={{ color: palette.primary.dark }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            sx={{
              borderRadius: 3,
              p: 3.5,
              border: '1px solid',
              borderColor: palette.primary.light,
            }}
          >
            <UiIcon name={Icons.ListSettingFill} color={palette.primary.light} />
          </IconButton>
        </Stack>
        <Grid container spacing={4} mt={5}>
          {ROLES.map((role, idx) => (
            <Grid key={idx} item xs={6}>
              <RoleCard title={role.title} desc={role.desc} permissions={role.permissions} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Roles
