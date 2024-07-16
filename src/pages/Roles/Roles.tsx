import { Button, IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { HTMLAttributes, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AdminPermissionModal, PageTitles } from '@/common'
import { Icons } from '@/enums'
import { UiIcon, UiTextField } from '@/ui'
type Props = HTMLAttributes<HTMLDivElement>

const Roles = ({ ...rest }: Props) => {
  const { t } = useTranslation()
  const { palette } = useTheme()
  const [isAdminPermissionModalOpen, setIsAdminPermissionModalOpen] = useState(false)
  return (
    <Stack {...rest} alignItems='flex-start' pr={10}>
      <PageTitles title={t('roles-page.title')} subtitle={t('roles-page.subtitle')} />
      <Stack direction='row' mt={10} justifyContent='space-between' width='100%'>
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
        <Button
          onClick={() => setIsAdminPermissionModalOpen(true)}
          sx={{ color: palette.common.white }}
        >
          <UiIcon componentName='add' sx={{ mr: 2 }} />
          {t('roles-page.create-role')}
        </Button>
      </Stack>
      <AdminPermissionModal
        isOpen={isAdminPermissionModalOpen}
        handleClose={() => setIsAdminPermissionModalOpen(false)}
        mode='add'
      />
    </Stack>
  )
}

export default Roles
