import { Button, IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { HTMLAttributes, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitles } from '@/common'
import { Icons } from '@/enums'
import { InviteNewAdministratorModal } from '@/modals'
import { UiIcon, UiTextField } from '@/ui'
type Props = HTMLAttributes<HTMLDivElement>

const Administrators = ({ ...rest }: Props) => {
  const [isInviteAdminModalOpen, setIsInviteAdminModalOpen] = useState(false)

  const { t } = useTranslation()
  const { palette } = useTheme()

  return (
    <Stack {...rest} alignItems='flex-start' pr={10}>
      <PageTitles
        title={t('administrators-page.title')}
        subtitle={t('administrators-page.subtitle')}
      />
      <Stack direction='row' mt={10} justifyContent='space-between' width='100%'>
        <Stack direction='row' gap={3}>
          <UiTextField
            placeholder={t('administrators-page.search')}
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
          onClick={() => setIsInviteAdminModalOpen(true)}
          sx={{ color: palette.common.white }}
        >
          <UiIcon componentName='add' sx={{ mr: 2 }} />
          {t('administrators-page.invite-admin')}
        </Button>
      </Stack>
      <InviteNewAdministratorModal
        isOpen={isInviteAdminModalOpen}
        handleClose={() => setIsInviteAdminModalOpen(false)}
      />
    </Stack>
  )
}

export default Administrators
