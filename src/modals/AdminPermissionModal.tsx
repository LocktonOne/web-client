import { Button, IconButton, Modal, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Icons } from '@/enums'
import { FontWeight } from '@/theme/constants'
import { UiIcon, UiSelect, UiTextField } from '@/ui'

type Props = {
  isOpen: boolean
  handleClose: () => void
  mode: 'add' | 'edit'
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.default',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

const PermissionOptions = [{ label: 'Allowed', value: 'allowed' }]

const AdminPermissionModal = ({ isOpen, handleClose, mode }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()
  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='Edit/Add KYC administrator role'>
      <Stack sx={style}>
        <Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={FontWeight.Regular}>
              {mode === 'add'
                ? t('admin-permission-modal.title-add')
                : t('admin-permission-modal.title-edit')}
            </Typography>
            <IconButton onClick={handleClose}>
              <UiIcon name={Icons.Close} color={palette.primary.light} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={8}>
            {mode === 'add'
              ? t('admin-permission-modal.modal-desc-add')
              : t('admin-permission-modal.modal-desc-edit')}
          </Typography>
        </Stack>
        <Stack mt={8} gap={6}>
          <UiTextField placeholder='Enter role name' label={t('admin-permission-modal.name')} />
          <UiTextField
            sx={{ '& .MuiInputBase-root': { minHeight: 70 } }}
            placeholder='Enter role description'
            label={t('admin-permission-modal.role-desc')}
          />
        </Stack>
        <Typography
          sx={{ fontSize: 16, color: palette.primary.dark, fontWeight: FontWeight.Medium }}
          mt={4}
        >
          {t('admin-permission-modal.permissions')}
        </Typography>
        <Stack direction='row' alignItems='flex-start' justifyContent='space-between' mt={2}>
          <UiTextField
            placeholder='New permission'
            label={t('admin-permission-modal.resource')}
            fullWidth
          />
          <Stack width={170}>
            <UiSelect
              label={t('admin-permission-modal.permission-type')}
              value={PermissionOptions[0].value}
              options={PermissionOptions}
            />
            <Button
              size='medium'
              fullWidth
              sx={{
                bgcolor: palette.common.white,
                borderRadius: 2.5,
                mt: 3,
                border: '1px solid',
                color: palette.text.primary,
                borderColor: palette.primary.main,
                '&:hover': { bgcolor: 'transparent', borderColor: palette.action.hover },
              }}
            >
              <UiIcon componentName='add' sx={{ color: palette.primary.light, mr: 2 }} />
              {t('admin-permission-modal.add-permission')}
            </Button>
          </Stack>
        </Stack>
        <Button sx={{ mt: 8, width: 160 }}>{t('admin-permission-modal.submit-btn')}</Button>
      </Stack>
    </Modal>
  )
}

export default AdminPermissionModal
