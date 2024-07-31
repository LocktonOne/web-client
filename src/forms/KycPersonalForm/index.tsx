import { PROVIDERS } from '@distributedlab/w3p'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useKycUser } from '@/hooks/kyc/user'
import { web3Store } from '@/store'
import { FontWeight } from '@/theme/constants'
import { RequestDescriptionKyc } from '@/types'
import { UiIcon, UiTextField } from '@/ui'
import { BlobUtil } from '@/utils'

type Props = {
  isActive: boolean
  handleChange: () => void
}

enum FieldNames {
  Name = 'name',
  Surname = 'surname',
  PassportSerialNumber = 'passportSerialNumber',
  PassportIssuanceDate = 'passportIssuanceDate',
}

const KycPersonalForm = ({ isActive, handleChange }: Props) => {
  const { t } = useTranslation()
  const { palette, typography } = useTheme()
  const { requestKYCRole, loadAllKyc, init } = useKycUser()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Name]: string
    [FieldNames.Surname]: string
    [FieldNames.PassportSerialNumber]: string
    [FieldNames.PassportIssuanceDate]: string
  }>(
    () => ({
      [FieldNames.Name]: '',
      [FieldNames.Surname]: '',
      [FieldNames.PassportSerialNumber]: '',
      [FieldNames.PassportIssuanceDate]: '',
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
      [FieldNames.Name]: yup.string().required(),
      [FieldNames.Surname]: yup.string().required(),
      [FieldNames.PassportSerialNumber]: yup.string().required(),
      [FieldNames.PassportIssuanceDate]: yup.string().required(),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      if (!web3Store.provider?.address) {
        await web3Store.connect(PROVIDERS.Metamask)
      }
      const kycBlob = new BlobUtil<RequestDescriptionKyc>({
        rawData: {
          firstName: formState[FieldNames.Name],
          lastName: formState[FieldNames.Surname],
          passportSerialNumber: formState[FieldNames.PassportSerialNumber],
          passportIssuanceDate: formState[FieldNames.PassportIssuanceDate],
        },
        owner: web3Store.provider?.address,
      })
      await kycBlob.create()

      await init()

      await requestKYCRole(kycBlob.id!)
      await loadAllKyc()

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
        mt: 8,
      }}
      width='100%'
      gap={6}
    >
      <Stack
        component='button'
        onClick={handleChange}
        direction='row'
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid',
          borderColor: palette.secondary.light,
          bgcolor: palette.background.default,
          borderRadius: 4,
          py: 2.5,
          px: 4,
          cursor: 'pointer',
        }}
      >
        <Stack direction='row' alignItems='center'>
          <UiIcon name={Icons.UserBtn} size={12} color={palette.secondary.light} mr={3} />
          <Typography variant='body3' fontWeight={FontWeight.Medium}>
            {t('kyc-personal-form.title')}
          </Typography>
        </Stack>
        <UiIcon
          name={isActive ? Icons.CheckCircle : Icons.CircleEmpty}
          size={6}
          color={palette.secondary.light}
          mr={3}
        />
      </Stack>
      <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
        <Stack
          width='100%'
          sx={{
            bgcolor: palette.background.default,
            borderRadius: 4,
            p: 6,
            border: '1px solid',
            borderColor: palette.secondary.light,
            height: 520,
            opacity: isActive ? '100%' : '50%',
            justifyContent: 'space-between',
          }}
        >
          <Stack gap={4}>
            <Controller
              name={FieldNames.Name}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Name'
                  placeholder='Enter name'
                  errorMessage={getErrorMessage(FieldNames.Name)}
                  disabled={isFormDisabled}
                />
              )}
            />

            <Controller
              name={FieldNames.Surname}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Surname'
                  placeholder='Enter surname'
                  errorMessage={getErrorMessage(FieldNames.Surname)}
                  disabled={isFormDisabled}
                />
              )}
            />

            <Controller
              name={FieldNames.PassportSerialNumber}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Passport serial number'
                  placeholder='Enter passport serial number'
                  errorMessage={getErrorMessage(FieldNames.PassportSerialNumber)}
                  disabled={isFormDisabled}
                />
              )}
            />

            <Controller
              name={FieldNames.PassportIssuanceDate}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Passport issuance date'
                  placeholder='Enter passport issuance date'
                  errorMessage={getErrorMessage(FieldNames.PassportIssuanceDate)}
                  disabled={isFormDisabled}
                />
              )}
            />
          </Stack>

          <Button
            type='submit'
            variant='contained'
            disabled={!isActive}
            sx={{
              background: palette.primary.dark,
              fontWeight: typography.fontWeightBold,
              width: '50%',
              mt: 12,
              '&:disabled': {
                backgroundColor: palette.common.black,
                color: palette.common.white,
              },
            }}
          >
            {t('kyc-personal-form.submit-btn')}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default KycPersonalForm
