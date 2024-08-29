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
import { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm, useTokensListContext } from '@/hooks'
import { coreContracts } from '@/modules/sdk'
import { createTERC20Factory } from '@/modules/sdk/contracts/terc20'
import { web3Store } from '@/store'
import { FontWeight } from '@/theme/constants'
import { SelectOption } from '@/types'
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

const defaultSelectOptions = [{ label: config.NATIVE_TOKEN, value: config.NATIVE_TOKEN, addr: '0' }]

const SendTokensModal = ({ isOpen, handleClose }: Props) => {
  const [activeToken, setActiveToken] = useState(config.NATIVE_TOKEN)
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>(defaultSelectOptions)
  const { tokensList } = useTokensListContext()
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

  const sendNativeTokens = async (toAddress: string, amount: string) => {
    const amountInWei = ethers.utils.parseEther(amount)
    const tx = {
      to: toAddress,
      value: amountInWei,
    }
    await web3Store.provider?.signAndSendTx(tx)
  }

  const sendOtherTokens = async (tokenAddress: string, toAddress: string, amount: string) => {
    const tokenContract = createTERC20Factory(
      tokenAddress,
      coreContracts.rawProvider,
      coreContracts.provider,
    )
    const decimals = await tokenContract.contractInstance.decimals()
    const amountInWei = ethers.utils.parseUnits(amount, decimals)
    await tokenContract.transferTo(amountInWei, toAddress)
  }

  const getListTokens = () => {
    const _selectOptions = [...defaultSelectOptions]
    for (const token of tokensList) {
      _selectOptions.push({ label: token.symbol, value: token.symbol, addr: token.address })
    }
    setSelectOptions(_selectOptions)
  }

  const submit = async () => {
    disableForm()
    try {
      const _token = selectOptions.find(token => token.value === activeToken)
      if (_token) {
        _token.addr !== '0'
          ? await sendOtherTokens(
              _token.addr,
              formState[FieldNames.RecipientAddress],
              formState[FieldNames.AmountToken],
            )
          : await sendNativeTokens(
              formState[FieldNames.RecipientAddress],
              formState[FieldNames.AmountToken],
            )
      }
      handleClose()
      bus.emit(BusEvents.success, { message: 'Success' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  useEffect(() => {
    getListTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              options={selectOptions}
              value={activeToken}
              updateValue={value => setActiveToken(value)}
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
