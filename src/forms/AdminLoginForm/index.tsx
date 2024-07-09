import { Button, FormControl, InputAdornment, Stack, Typography, useTheme } from '@mui/material'
import { FormEvent } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { UiIcon, UiTextField } from '@/ui'

enum FieldNames {
  Seed = 'seed',
}

const AdminLoginForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()

  const { isFormDisabled, disableForm, enableForm, getErrorMessage, control } = useForm(
    {
      [FieldNames.Seed]: '',
    },
    yup =>
      yup.object().shape({
        [FieldNames.Seed]: yup.string().required(),
      }),
  )

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    disableForm()
    try {
      bus.emit(BusEvents.success)
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <Stack
      component='form'
  onSubmit={submit}
  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  gap={spacing(6)}
>
  <UiIcon name={Icons.UserCircle} size={15} />
  <Stack sx={{ alignItems: 'center' }} gap={1}>
  <Typography variant='h5'>{t('login-form.admin-title')}</Typography>
  <Typography variant='body3' sx={{ color: palette.primary.light }}>
  {t('login-form.admin-desc')}
  </Typography>
  </Stack>
  <Controller
  name={FieldNames.Seed}
  control={control}
  render={({ field }) => (
    <FormControl fullWidth>
    <UiTextField
      {...field}
  label={FieldNames.Seed}
  errorMessage={getErrorMessage(FieldNames.Seed)}
  InputProps={{
    startAdornment: (
      <InputAdornment position='start'>
      <UiIcon name={Icons.Lock} size={4} />
    </InputAdornment>
  ),
  }}
  placeholder={t('login-form.admin-placeholder')}
  disabled={isFormDisabled}
  />
  </FormControl>
)}
  />
  <Button
  variant='contained'
  fullWidth
  sx={{
    background: palette.primary.dark,
      fontWeight: typography.fontWeightBold,
  }}
  disabled={isFormDisabled}
    >
    {t('login-form.submit-btn')}
  </Button>
  </Stack>
)
}

export default AdminLoginForm
