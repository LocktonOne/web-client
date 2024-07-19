import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useContainer } from '@/api/modules'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { UiIcon, UiTextField } from '@/ui'

enum FieldNames {
  Email = 'email',
  Password = 'password',
  RepeatPassword = 'repeatPassword',
}

const RegisterForm = () => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const { palette, typography } = useTheme()
  const container = useContainer()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Email]: string
    [FieldNames.Password]: string
    [FieldNames.RepeatPassword]: string
  }>(
    () => ({
      [FieldNames.Email]: '',
      [FieldNames.Password]: '',
      [FieldNames.RepeatPassword]: '',
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
  } = useForm(DEFAULT_VALUES, yup => yup.object().shape({}))

  const submit = async () => {
    disableForm()
    try {
      const generatedContainer = await container.create(formState.email, formState.password)
      console.log(generatedContainer)
      // containerStore.setContainer(generatedContainer)
      bus.emit(BusEvents.success, { message: 'Success log in' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <Stack
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 6 }}
      width={480}
      gap={spacing(6)}
    >
      <UiIcon name={Icons.UserCircle} size={15} />
      <Stack sx={{ alignItems: 'center' }} gap={1}>
        <Typography variant='h5'>{t('register-form.title')}</Typography>
        <Typography sx={{ fontSize: spacing(4.5), color: palette.primary.light }} mt={2}>
          {t('register-form.desc')}
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
        <Stack gap={4} width='100%'>
          <Controller
            name={FieldNames.Email}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                fullWidth
                label='Email'
                placeholder='Ex:Johndoe@financial.com'
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
                placeholder='Enter your password'
                errorMessage={getErrorMessage(FieldNames.Password)}
                disabled={isFormDisabled}
              />
            )}
          />

          <Controller
            name={FieldNames.RepeatPassword}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                fullWidth
                type='password'
                label='Confirm your password'
                placeholder='Confirm your password'
                disabled={isFormDisabled}
                errorMessage={getErrorMessage(FieldNames.RepeatPassword)}
              />
            )}
          />
        </Stack>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            background: palette.primary.dark,
            fontWeight: typography.fontWeightBold,
            mt: 12,
          }}
        >
          {t('register-form.submit-btn')}
        </Button>
      </form>
    </Stack>
  )
}

export default RegisterForm
