import { config } from '@config'
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { web3Store } from '@/store'
import { FontWeight } from '@/theme/constants'
import { UiIcon, UiSelect, UiTextField } from '@/ui'

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
  RecipientAddress = 'recipientAddress',
  AmountToken = 'amountTokens',
}

const SelectOptions = [{ label: config.NATIVE_TOKEN, value: config.NATIVE_TOKEN }]

const SendTokensModal = ({ isOpen, handleClose }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.RecipientAddress]: string
    [FieldNames.AmountToken]: string
  }>(
    () => ({
      [FieldNames.RecipientAddress]: '',
      [FieldNames.AmountToken]: '',
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
      [FieldNames.RecipientAddress]: yup
        .string()
        .matches(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid ether address')
        .required(),
      [FieldNames.AmountToken]: yup.number().required(),
    }),
  )

  async function sendTokens(toAddress: string, amountInEther: string) {
    const amountInWei = ethers.utils.parseEther(amountInEther)
    const tx = {
      to: toAddress,
      value: amountInWei,
    }
    await web3Store.provider?.signAndSendTx(tx)
  }

  const submit = async () => {
    disableForm()
    try {
      await sendTokens(formState[FieldNames.RecipientAddress], formState[FieldNames.AmountToken])
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
              {t('send-tokens-modal.title')}
            </Typography>
            <IconButton onClick={handleClose}>
              <UiIcon name={Icons.Close} color={palette.primary.light} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={7}>
            {t('send-tokens-modal.modal-desc')}
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
          <Stack mt={4}>
            <Controller
              name={FieldNames.RecipientAddress}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  placeholder='Enter recipient address'
                  label={t('send-tokens-modal.address')}
                  errorMessage={getErrorMessage(FieldNames.RecipientAddress)}
                  disabled={isFormDisabled}
                />
              )}
            />
          </Stack>
          <Stack mt={4}>
            <UiSelect
              label={t('send-tokens-modal.token-name')}
              options={SelectOptions}
              value={SelectOptions[0].value}
              disabled={isFormDisabled}
            />
          </Stack>
          <Stack mt={4}>
            <Controller
              name={FieldNames.AmountToken}
              control={control}
              render={({ field }) => (
                <UiTextField
                  {...field}
                  fullWidth
                  placeholder='Enter amoun of token'
                  label={t('send-tokens-modal.amount')}
                  errorMessage={getErrorMessage(FieldNames.AmountToken)}
                  disabled={isFormDisabled}
                />
              )}
            />
          </Stack>
          <Button type='submit' disabled={isFormDisabled} sx={{ mt: 8, width: 160 }}>
            {t('send-tokens-modal.submit-btn')}
          </Button>
        </form>
        {isFormDisabled && (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Stack>
    </Modal>
  )
}

export default SendTokensModal
