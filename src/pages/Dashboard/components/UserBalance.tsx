import { config } from '@config'
import { EthereumProvider } from '@distributedlab/w3p'
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Icons } from '@/enums'
import { SendTokensModal } from '@/modals'
import { coreContracts } from '@/modules/sdk'
import { web3Store } from '@/store'
import { UiIcon, UiSelect } from '@/ui'

const EXCHANGE_RATE = 1
const SelectOptions = [
  { label: config.NATIVE_TOKEN, value: config.NATIVE_TOKEN, addr: '0' },
  { label: 2, value: 2, addr: '1' },
]

const UserBalance = () => {
  const [balance, setBalance] = useState<string | number>('')
  const [balanceInUSD, setBalanceInUSD] = useState<string | number>('')
  const [isSendTokenModalOpen, setIsOpenModalOpen] = useState(false)
  const [activeToken, setActiveToken] = useState(config.NATIVE_TOKEN)

  const { palette, spacing } = useTheme()
  const { t } = useTranslation()

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
    const _balanceInUSD = (parseFloat(balance.toString()) * EXCHANGE_RATE).toFixed(2)
    setBalanceInUSD(_balanceInUSD)
    setBalance(balance)
  }

  const checkBalance = async (activeToken: string) => {
    const _token = SelectOptions.find(token => token.value === activeToken)
    if (_token) {
      _token.addr === '0' ? await checkNativeBalance() : await checkOtherTokenBalance(_token.addr)
    }
  }

  useEffect(() => {
    checkBalance(activeToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToken])

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
            options={SelectOptions}
            value={activeToken}
            updateValue={value => setActiveToken(value)}
            sx={{ maxHeight: 30, minHeight: 30 }}
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 5, borderColor: palette.secondary.light }} />
      <Stack justifyContent='space-between' height='100%'>
        <Stack direction='row' alignItems='center'>
          <Typography variant='h4'>{`${balance} ${config.NATIVE_TOKEN}`}</Typography>
          <Typography sx={{ fontSize: spacing(4.5), color: palette.primary.light }} ml={3}>
            {`$${balanceInUSD}`}
          </Typography>
        </Stack>
        <Button sx={{ width: 200 }} onClick={() => setIsOpenModalOpen(true)}>
          <UiIcon name={Icons.ArrowUpRight} size={5} mr={2} />
          {t('user-balance.send')}
        </Button>
      </Stack>
      <SendTokensModal
        isOpen={isSendTokenModalOpen}
        handleClose={() => setIsOpenModalOpen(false)}
      />
    </Stack>
  )
}

export default UserBalance
