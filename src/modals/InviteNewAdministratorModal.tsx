import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons, Roles } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { coreContracts } from '@/modules/sdk'
import { FontWeight } from '@/theme/constants'
import { UiIcon, UiTextField } from '@/ui'

type Props = {
  isOpen: boolean
  handleClose: () => void
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

enum FieldNames {
  Address = 'address',
}

const InviteNewAdministratorModal = ({ isOpen, handleClose }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Address]: string
  }>(
    () => ({
      [FieldNames.Address]: '',
    }),
    [],
  )

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    control,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FieldNames.Address]: yup
        .string()
        .matches(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid ether address')
        .required(),
    }),
  )

  const addRole = async (addr: string) => {
    const masterAccess = coreContracts.getMasterAccessManagementContract()
    await masterAccess.grantRoles(addr, [Roles.ADMIN])
  }

  const submit = async () => {
    disableForm()
    try {
      await addRole(formState[FieldNames.Address])
      handleClose()
      bus.emit(BusEvents.success, { message: 'Success' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='Deploy new Contract'>
      <Stack sx={style}>
        <Stack sx={{ opacity: isFormDisabled ? 0.5 : 1 }}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={FontWeight.Regular}>
              {t('new-admin-modal.title')}
            </Typography>
            <IconButton onClick={handleClose}>
              <UiIcon name={Icons.Close} color={palette.primary.light} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={7}>
            {t('new-admin-modal.desc')}
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
          <Stack mt={4}>
            <Controller
              name={FieldNames.Address}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  placeholder='Enter recipient address'
                  label={t('new-admin-modal.address')}
                  errorMessage={getErrorMessage(FieldNames.Address)}
                  disabled={isFormDisabled}
                />
              )}
            />
          </Stack>
          <Button type='submit' disabled={isFormDisabled} sx={{ mt: 8, width: 160 }}>
            {t('new-admin-modal.submit-btn')}
          </Button>
        </form>
        {isFormDisabled && (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Stack>
    </Modal>
  )
}

export default InviteNewAdministratorModal
