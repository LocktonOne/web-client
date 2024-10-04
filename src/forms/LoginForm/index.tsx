import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { BusEvents, Icons, RoutePaths } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useAuth, useForm } from '@/hooks'
import { UiIcon, UiTextField } from '@/ui'

enum FieldNames {
  Email = 'email',
  Password = 'password',
}

const LoginForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()
  const { login } = useAuth()
  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Email]: string
    [FieldNames.Password]: string
  }>(
    () => ({
      [FieldNames.Email]: '',
      [FieldNames.Password]: '',
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
      [FieldNames.Email]: yup.string().email().required(),
      [FieldNames.Password]: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      await login(formState[FieldNames.Email], formState[FieldNames.Password])
      bus.emit(BusEvents.success, { message: 'Success log in' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 54,
        paddingTop: 10,
        paddingBottom: 20,
        bgcolor: palette.background.tertiary,
        border: `1px solid ${palette.border.main}`,
        borderRadius: 6,
        zIndex: 1,
        position: 'relative',
      }}
      gap={spacing(10)}
    >
      <UiIcon name={Icons.CompanyLogo} size={40} sx={{ height: 60, minHeight: 60 }} />
      <Stack sx={{ alignItems: 'center' }} gap={1}>
        <Typography variant='subtitle1'>{t('login-form.title')}</Typography>
        <Typography variant='body3'>
          {t('login-form.desc') + ' '}
          <NavLink to={RoutePaths.Register}>{t('login-form.register')}</NavLink>
        </Typography>
      </Stack>
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Stack gap={4} width='100%'>
          <Controller
            name={FieldNames.Email}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                fullWidth
                label='Email address'
                errorMessage={getErrorMessage(FieldNames.Email)}
                disabled={isFormDisabled}
              />
            )}
          />
          <Controller
            name={FieldNames.Password}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                fullWidth
                type='password'
                label='Password'
                errorMessage={getErrorMessage(FieldNames.Password)}
                disabled={isFormDisabled}
              />
            )}
          />
        </Stack>
        <Button
          type='submit'
          variant='contained'
          sx={{
            background: palette.primary.dark,
            px: 25,
            fontWeight: typography.fontWeightBold,
            mt: 12,
          }}
        >
          {t('login-form.submit-btn')}
        </Button>
      </form>
    </Stack>
  )
}

export default LoginForm
