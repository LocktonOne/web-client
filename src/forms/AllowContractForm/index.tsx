import { Button, CircularProgress, Stack } from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { coreContracts } from '@/modules/sdk'
import { UiTextField } from '@/ui'

enum FieldNames {
  ByteCode = 'byteCode',
}

const AllowContractForm = () => {
  const { t } = useTranslation()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.ByteCode]: string
  }>(
    () => ({
      [FieldNames.ByteCode]: '',
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
      [FieldNames.ByteCode]: yup.string().required(),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      const { addAllowedContract } = coreContracts.getAllowedContractRegistry()
      await addAllowedContract(formState[FieldNames.ByteCode])
      bus.emit(BusEvents.success, { message: 'Success' })
    } catch (error) {
      bus.emit(BusEvents.error, { message: 'Error' })
      ErrorHandler.process(error)
    }
    reset()
    enableForm()
  }

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      <Stack sx={{ opacity: isFormDisabled ? 0.5 : 1 }}>
        <Stack mt={4}>
          <Controller
            name={FieldNames.ByteCode}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                multiline
                sx={{ '& .MuiInputBase-root': { minHeight: 440 } }}
                rows={20}
                placeholder='Enter Byte Code'
                label={t('allow-contract-form.byte-code')}
                errorMessage={getErrorMessage(FieldNames.ByteCode)}
                disabled={isFormDisabled}
              />
            )}
          />
        </Stack>
        <Button type='submit' disabled={isFormDisabled} sx={{ mt: 8, width: 160 }}>
          {t('allow-contract-form.submit-btn')}
        </Button>
        {isFormDisabled && (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Stack>
    </form>
  )
}

export default AllowContractForm
