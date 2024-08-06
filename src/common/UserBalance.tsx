import { EthereumProvider } from '@distributedlab/w3p'
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SendTokensModal } from '@/common/index'
import { Icons } from '@/enums'
import { coreContracts } from '@/modules/sdk'
import { web3Store } from '@/store'
import { UiIcon, UiSelect } from '@/ui'

const EXCHANGE_RATE_ETH_USDT = 3000
const SelectOptions = [{ label: 'ETH', value: 'ETH' }]

const UserBalance = () => {
  const [balance, setBalance] = useState('')
  const [balanceInUSD, setBalanceInUSD] = useState('')
  const [isSendTokenModalOpen, setIsOpenModalOpen] = useState(false)

  const { palette, spacing } = useTheme()
  const { t } = useTranslation()

  const checkBalance = async () => {
    const provider = new ethers.providers.Web3Provider(
      web3Store.provider?.rawProvider as EthereumProvider,
    )
    const balance = await provider.getBalance(coreContracts.provider.address!)
    const balanceInEth = ethers.utils.formatEther(balance)
    const formattedBalanceInEth = parseFloat(balanceInEth).toFixed(4)

    const _balanceInUSD = (parseFloat(balanceInEth) * EXCHANGE_RATE_ETH_USDT).toFixed(2)
    setBalanceInUSD(_balanceInUSD)
    setBalance(formattedBalanceInEth)
  }

  useEffect(() => {
    checkBalance()
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
            options={SelectOptions}
            value={SelectOptions[0].value}
            sx={{ maxHeight: 30, minHeight: 30 }}
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 5, borderColor: palette.secondary.light }} />
      <Stack justifyContent='space-between' height='100%'>
        <Stack direction='row' alignItems='center'>
          <Typography variant='h4'>{`${balance} ETH`}</Typography>
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
