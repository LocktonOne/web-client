import { config } from '@config'
import { EthereumProvider } from '@distributedlab/w3p'
import { Button, CircularProgress, Divider, Stack, Typography, useTheme } from '@mui/material'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons, Roles } from '@/enums'
import { bus } from '@/helpers'
import { useAuth, useTokensListContext } from '@/hooks'
import { SendTokensModal } from '@/modals'
import { coreContracts } from '@/modules/sdk'
import { createTERC20Factory } from '@/modules/sdk/contracts/terc20'
import { web3Store } from '@/store'
import { SelectOption } from '@/types'
import { UiIcon, UiSelect } from '@/ui'

const EXCHANGE_RATE = 1
const DEFAULT_AMOUNT_MINT = '1'

const defaultSelectOptions = [{ label: config.NATIVE_TOKEN, value: config.NATIVE_TOKEN, addr: '0' }]

const UserBalance = () => {
  const [balance, setBalance] = useState<string | number>('')
  const [balanceInUSD, setBalanceInUSD] = useState<string | number>('')
  const [isSendTokenModalOpen, setIsOpenModalOpen] = useState(false)
  const [activeToken, setActiveToken] = useState(config.NATIVE_TOKEN)
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>(defaultSelectOptions)
  const [isMinting, setIsMinting] = useState(false)

  const { palette, spacing } = useTheme()
  const { t } = useTranslation()
  const { tokensList } = useTokensListContext()
  const { role } = useAuth()

  const checkNativeBalance = async () => {
    const provider = new ethers.providers.Web3Provider(
      web3Store.provider?.rawProvider as EthereumProvider,
    )
    const balance = await provider.getBalance(coreContracts.provider.address!)
    const balanceInNativeToken = ethers.utils.formatEther(balance)
    const formattedBalanceInNativeToken = parseFloat(balanceInNativeToken).toFixed(4)

    const _balanceInUSD = (parseFloat(balanceInNativeToken) * EXCHANGE_RATE).toFixed(2)
    setBalanceInUSD(_balanceInUSD)
    setBalance(formattedBalanceInNativeToken)
  }

  const checkOtherTokenBalance = async (addr: string) => {
    const tokenFactory = coreContracts.getTokenFactoryContract()
    const balance = await tokenFactory.getTokenBalance(addr, coreContracts.provider.address!)
    const formattedBalance = parseFloat(balance).toFixed(4)
    const _balanceInUSD = (parseFloat(balance.toString()) * EXCHANGE_RATE).toFixed(2)
    setBalanceInUSD(_balanceInUSD)
    setBalance(formattedBalance)
  }

  const checkBalance = async (activeToken: string) => {
    const _token = selectOptions.find(token => token.value === activeToken)
    if (_token) {
      _token.addr !== '0' ? await checkOtherTokenBalance(_token.addr) : await checkNativeBalance()
    }
  }

  const getListTokens = () => {
    const _selectOptions = [...defaultSelectOptions]
    for (const token of tokensList) {
      _selectOptions.push({ label: token.symbol, value: token.symbol, addr: token.address })
    }
    setSelectOptions(_selectOptions)
  }

  const mint = async () => {
    setIsMinting(true)
    try {
      const _token = selectOptions.find(token => token.value === activeToken)
      const tokenContract = createTERC20Factory(
        _token!.addr!,
        coreContracts.rawProvider,
        coreContracts.provider,
      )
      const decimals = await tokenContract.contractInstance.decimals()
      const amountInWei = ethers.utils.parseUnits(DEFAULT_AMOUNT_MINT, decimals)
      await tokenContract.mintToken(amountInWei)
      await checkBalance(activeToken)
      bus.emit(BusEvents.success, { message: 'Success minting 1 token' })
    } catch (e) {
      bus.emit(BusEvents.error, { message: 'Error' })
      console.error(e)
    }

    setIsMinting(false)
  }

  const handleCloseSendModal = async () => {
    await checkBalance(activeToken)
    setIsOpenModalOpen(false)
  }

  useEffect(() => {
    checkBalance(activeToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToken])

  useEffect(() => {
    getListTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: palette.secondary.light,
        borderRadius: 3,
        p: 4,
        width: '50%',
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' gap={3}>
          <UiIcon name={Icons.WalletFilled} size={6} />
          <Typography variant='subtitle3'>{t('user-balance.my-balance')}</Typography>
        </Stack>
        <Stack width={200}>
          <UiSelect
            options={selectOptions}
            value={activeToken}
            updateValue={value => setActiveToken(value)}
            sx={{ maxHeight: 30, minHeight: 30 }}
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 5, borderColor: palette.secondary.light }} />
      <Stack justifyContent='space-between' height='100%'>
        <Stack direction='row' alignItems='center'>
          <Typography variant='h4'>{`${balance} ${activeToken}`}</Typography>
          <Typography sx={{ fontSize: spacing(4.5), color: palette.primary.light }} ml={3}>
            {`$${balanceInUSD}`}
          </Typography>
        </Stack>
        <Stack direction='row' gap={6}>
          <Stack direction='row' alignItems='center' spacing={5}>
            <Button
              sx={{ width: 200 }}
              disabled={role === Roles.UNVERIFIED}
              onClick={() => setIsOpenModalOpen(true)}
            >
              <UiIcon name={Icons.ArrowUpRight} size={5} mr={2} />
              {t('user-balance.send')}
            </Button>
            {role === Roles.UNVERIFIED && (
              <UiIcon name={Icons.LockFill} sx={{ color: palette.primary.light }} />
            )}
          </Stack>
          <Stack direction='row' alignItems='center' spacing={5}>
            <Button
              sx={{ width: 200 }}
              disabled={
                activeToken === config.NATIVE_TOKEN || isMinting || role !== Roles.CORPORATE
              }
              onClick={() => mint()}
            >
              <UiIcon name={Icons.Cardholder} size={5} mr={2} />
              {t('user-balance.mint')}
            </Button>
            {(activeToken === config.NATIVE_TOKEN || role !== Roles.CORPORATE) && (
              <UiIcon name={Icons.LockFill} sx={{ color: palette.primary.light }} />
            )}
            {isMinting && <CircularProgress />}
          </Stack>
        </Stack>
      </Stack>
      <SendTokensModal isOpen={isSendTokenModalOpen} handleClose={handleCloseSendModal} />
    </Stack>
  )
}

export default UserBalance
