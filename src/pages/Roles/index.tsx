import { Grid, IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { getListRoles } from '@/callers'
import { PageTitles } from '@/common'
import { Icons } from '@/enums'
import { useLoading } from '@/hooks'
import { RoleCard } from '@/pages/Roles/components'
import { UiIcon, UiTextField } from '@/ui'

type Props = HTMLAttributes<HTMLDivElement>

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  const { palette } = useTheme()
  const {
    data: { roles },
    isLoading: isLoading,
    isLoadingError: isLoadingError,
  } = useLoading({ roles: [] }, () => getListRoles())

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
          {!isLoading &&
            !isLoadingError &&
            roles.map((role, idx) => (
              <Grid key={idx} item xs={6}>
                <RoleCard title={role.id} resources={role.resources} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Roles
