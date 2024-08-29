import { PROVIDERS } from '@distributedlab/w3p'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { createIdentity, getIdentity } from '@/api/modules/polygonId'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { BlobUtil, useKycUser } from '@/modules/sdk'
import { web3Store } from '@/store'
import { FontWeight } from '@/theme/constants'
import { RequestDescriptionKyc } from '@/types'
import { UiIcon, UiTextField } from '@/ui'

type Props = {
  isActive: boolean
  handleChange: () => void
  openSuccessModal: () => void
}

enum FieldNames {
  CompanyName = 'companyName',
  CompanyAddress = 'companyAddress',
  CompanyMainActivity = 'companyMainActivity',
}

const KycCompanyForm = ({ isActive, handleChange, openSuccessModal }: Props) => {
  const { t } = useTranslation()
  const { palette, typography } = useTheme()
  const { init, requestKYCRole } = useKycUser()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.CompanyName]: string
    [FieldNames.CompanyAddress]: string
    [FieldNames.CompanyMainActivity]: string
  }>(
    () => ({
      [FieldNames.CompanyName]: '',
      [FieldNames.CompanyAddress]: '',
      [FieldNames.CompanyMainActivity]: '',
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
    reset,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FieldNames.CompanyName]: yup.string().required(),
      [FieldNames.CompanyAddress]: yup.string().required(),
      [FieldNames.CompanyMainActivity]: yup.string().required(),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      if (!web3Store.provider?.address) {
        await web3Store.connect(PROVIDERS.Metamask)
      }
      await createIdentity()
      const DID = await getIdentity(web3Store.provider!.address!)
      const kycBlob = new BlobUtil<RequestDescriptionKyc>({
        rawData: {
          companyName: formState[FieldNames.CompanyName],
          companyAddress: formState[FieldNames.CompanyAddress],
          companyMainActivity: formState[FieldNames.CompanyMainActivity],
          DID,
          requestType: 'company',
        },
        owner: web3Store.provider?.address,
      })
      await kycBlob.create()
      await init()
      await requestKYCRole(kycBlob.id!)
      openSuccessModal()
      reset()
      bus.emit(BusEvents.success, { message: 'Success' })
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
          <UiIcon name={Icons.Company} size={12} color={palette.secondary.light} mr={3} />
          <Typography variant='body3' fontWeight={FontWeight.Medium}>
            {t('kyc-company-form.title')}
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
              name={FieldNames.CompanyName}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Company name'
                  placeholder='Enter company name'
                  errorMessage={getErrorMessage(FieldNames.CompanyName)}
                  disabled={isFormDisabled}
                />
              )}
            />

            <Controller
              name={FieldNames.CompanyAddress}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Company registration address'
                  placeholder='Enter company registration address'
                  errorMessage={getErrorMessage(FieldNames.CompanyAddress)}
                  disabled={isFormDisabled}
                />
              )}
            />

            <Controller
              name={FieldNames.CompanyMainActivity}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  label='Company main activity'
                  placeholder='Enter company main activity'
                  errorMessage={getErrorMessage(FieldNames.CompanyMainActivity)}
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
            {t('kyc-company-form.submit-btn')}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default KycCompanyForm
