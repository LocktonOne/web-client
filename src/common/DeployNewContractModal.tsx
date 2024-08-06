import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
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
  TokenName = 'tokenName',
  TokenSymbol = 'tokenSymbol',
  AmountToken = 'amountTokens',
}

const DeployNewContractModal = ({ isOpen, handleClose }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.TokenName]: string
    [FieldNames.TokenSymbol]: string
    [FieldNames.AmountToken]: number
  }>(
    () => ({
      [FieldNames.TokenName]: '',
      [FieldNames.TokenSymbol]: '',
      [FieldNames.AmountToken]: 0,
    }),
    [],
  )

  const {
    // formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    control,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FieldNames.TokenName]: yup.string().required(),
      [FieldNames.TokenSymbol]: yup.string().required(),
      [FieldNames.AmountToken]: yup.number().required(),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      // await requestTokenDeployment(
      //   formState[FieldNames.TokenName],
      //   formState[FieldNames.TokenSymbol],
      //   formState[FieldNames.AmountToken],
      // )
      bus.emit(BusEvents.success, { message: 'Success' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='Deploy new Contract'>
      <Stack sx={style}>
        <Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={FontWeight.Regular}>
              {t('new-contract-modal.title')}
            </Typography>
            <IconButton onClick={handleClose}>
              <UiIcon name={Icons.Close} color={palette.primary.light} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={7}>
            {t('new-contract-modal.modal-desc')}
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
          <Grid container mt={7} spacing={6}>
            <Grid item xs={6}>
              <Controller
                name={FieldNames.TokenName}
                control={control}
                render={({ field }) => (
                  <UiTextField
                    {...field}
                    placeholder='Enter token name'
                    label={t('new-contract-modal.token-name')}
                    errorMessage={getErrorMessage(FieldNames.TokenName)}
                    disabled={isFormDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name={FieldNames.TokenSymbol}
                control={control}
                render={({ field }) => (
                  <UiTextField
                    {...field}
                    placeholder='Enter token symbol'
                    label={t('new-contract-modal.token-symbol')}
                    errorMessage={getErrorMessage(FieldNames.TokenSymbol)}
                    disabled={isFormDisabled}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Stack mt={4}>
            <Controller
              name={FieldNames.AmountToken}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  placeholder='Enter amoun of token'
                  label={t('new-contract-modal.amount')}
                  errorMessage={getErrorMessage(FieldNames.AmountToken)}
                  disabled={isFormDisabled}
                />
              )}
            />
          </Stack>
          <Button type='submit' sx={{ mt: 8, width: 160 }}>
            {t('new-contract-modal.submit-btn')}
          </Button>
        </form>
        {isFormDisabled && (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Stack>
    </Modal>
  )
}

export default DeployNewContractModal
