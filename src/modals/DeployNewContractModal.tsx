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
import { useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons, Roles } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm, useTokensListContext } from '@/hooks'
import { coreContracts } from '@/modules/sdk'
import { FontWeight } from '@/theme/constants'
import { UiCheckbox, UiIcon, UiSelect, UiTextField } from '@/ui'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

interface Permissions {
  mint: boolean
  burn: boolean
  spend: boolean
  receive: boolean
}

type RolePermissions = {
  [key: string]: Permissions
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

const roleOptions = [
  { value: Roles.CORPORATE, label: 'Corporate' },
  { value: Roles.VERIFIED, label: 'Verification' },
  { value: Roles.UNVERIFIED, label: 'Unverified' },
]

const rolePermissions: RolePermissions = {
  [Roles.UNVERIFIED]: { mint: true, burn: true, spend: true, receive: true },
  [Roles.VERIFIED]: { mint: true, burn: false, spend: true, receive: true },
  [Roles.CORPORATE]: { mint: false, burn: false, spend: false, receive: true },
}

enum FieldNames {
  TokenName = 'tokenName',
  TokenSymbol = 'tokenSymbol',
  AmountToken = 'amountTokens',
}

const DeployNewContractModal = ({ isOpen, handleClose }: Props) => {
  const [role, setRole] = useState<string>(Roles.UNVERIFIED)
  const [permissions, setPermissions] = useState<RolePermissions>(rolePermissions)
  const { palette } = useTheme()
  const { t } = useTranslation()
  const { loadTokens } = useTokensListContext()

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
      [FieldNames.TokenName]: yup.string().required(),
      [FieldNames.TokenSymbol]: yup.string().required(),
      [FieldNames.AmountToken]: yup.number().required(),
    }),
  )

  const submit = async () => {
    disableForm()
    try {
      const tokenFactory = coreContracts.getTokenFactoryContract()
      const tokenParams = {
        name: formState[FieldNames.TokenName],
        symbol: formState[FieldNames.TokenSymbol],
        contractURI: 'https://example.com/token-metadata',
        decimals: 18,
        totalSupplyCap: formState[FieldNames.AmountToken],
        permissions: 15,
      }
      await tokenFactory.deployTERC20(tokenParams)
      await loadTokens()
      handleClose()
      reset()
      bus.emit(BusEvents.success, { message: 'Success' })
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  const handleRoleChange = (value: string) => {
    setRole(value)
  }

  const handleCheckboxChange = (permission: keyof Permissions) => {
    // TODO: remove checkbox logic after demo
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [permission]: !prevPermissions[role][permission],
      },
    }))
  }

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='Deploy new Contract'>
      <Stack sx={style}>
        <Stack sx={{ opacity: isFormDisabled ? 0.5 : 1 }}>
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
          <Stack mt={4}>
            <UiSelect
              label={t('admin-permission-modal.permission-type')}
              value={role}
              updateValue={handleRoleChange}
              options={roleOptions}
            />
          </Stack>
          <Stack mt={4} direction='row'>
            <UiCheckbox
              label='Mint'
              checked={permissions[role].mint}
              onChange={() => handleCheckboxChange('mint')}
            />
            <UiCheckbox
              label='Burn'
              checked={permissions[role].burn}
              onChange={() => handleCheckboxChange('burn')}
            />
            <UiCheckbox
              label='Spend'
              checked={permissions[role].spend}
              onChange={() => handleCheckboxChange('spend')}
            />
            <UiCheckbox
              label='Receive'
              checked={permissions[role].receive}
              onChange={() => handleCheckboxChange('receive')}
            />
          </Stack>
          <Button type='submit' disabled={isFormDisabled} sx={{ mt: 8, width: 160 }}>
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
