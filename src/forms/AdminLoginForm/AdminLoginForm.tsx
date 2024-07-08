import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Icon } from '@/common'
import { IconNames } from '@/enums'
import { bus, BUS_EVENTS, ErrorHandler, required } from '@/helpers'
import { useForm, useFormValidation } from '@/hooks'

const AdminLoginForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()
  const [seed, setSeed] = useState('')

  const { isFormDisabled, disableForm, enableForm } = useForm()
  const { isFieldsValid, touchForm, getFieldErrorMessage, touchField } =
    useFormValidation(
      {
        seed,
      },
      {
        seed: { required },
      },
    )

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    touchForm()
    if (!isFieldsValid) {
      bus.emit(BUS_EVENTS.error, 'form invalid')
      return
    }

    disableForm()
    try {
      bus.emit(BUS_EVENTS.success, t('login-form.login-success-msg'))
      bus.emit(BUS_EVENTS.success, `${seed}`)
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
      <Icon name={IconNames.userCircle} size={15} />
      <Stack sx={{ alignItems: 'center' }} gap={1}>
        <Typography variant='h5'>{t('login-form.admin-title')}</Typography>
        <Typography variant='body3' sx={{ color: palette.primary.light }}>
          {t('login-form.admin-desc')}
        </Typography>
      </Stack>
      <Stack width='100%' gap={1}>
        <Typography component='p' variant='body3'>
          {t('login-form.admin-lbl')}
        </Typography>
        <TextField
          value={seed}
          onChange={event => setSeed(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon name={IconNames.lockClosed} size={4} />
              </InputAdornment>
            ),
          }}
          placeholder={t('login-form.admin-placeholder')}
          helperText={getFieldErrorMessage('seed')}
          onBlur={() => touchField('seed')}
          disabled={isFormDisabled}
        />
      </Stack>
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
