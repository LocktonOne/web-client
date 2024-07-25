import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, formatDid } from '@/helpers'
import { useCopyToClipboard } from '@/hooks'
import { FontWeight } from '@/theme/constants'
import { UiIcon } from '@/ui'

interface Props extends StackProps {
  address: string
  userInfo: {
    type: 'unverified' | 'personal' | 'company'
    firstName: string
    lastName: string
    passportNumber: string
    passportDate: string
    DID: string
  }
}

const PART_LENGTH = 16

export default function AccountInformation({ address, userInfo, ...rest }: Props) {
  const { palette } = useTheme()
  const { t } = useTranslation()
  const { copy, isCopied } = useCopyToClipboard()

  const copyUserAddr = async () => {
    try {
      await copy(address)
    } catch (e) {
      bus.emit(BusEvents.error, {
        message: 'Not copied, please try again',
      })
    }
  }

  return (
    <Stack
      sx={{
        width: 660,
        borderRadius: 2,
        backgroundColor: palette.background.paper,
        p: 6,
        mt: 10,
        border: '1px solid',
        borderColor: palette.action.active,
      }}
      {...rest}
    >
      <Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' fontWeight={FontWeight.Regular}>
            {t('account-info.title')}
          </Typography>
          <Chip
            sx={{
              borderRadius: 2,
              backgroundColor: palette.primary.light,
              color: palette.common.white,
              py: 4,
              px: 6,
              minHeight: 43,
              fontSize: 18,
              fontWeight: FontWeight.Medium,
            }}
            label={userInfo.type}
          />
        </Stack>
        <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 7 }}>
          {t('account-info.account-id')}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='subtitle4' fontSize={18} overflow='hidden' textOverflow='ellipsis'>
            {formatDid(address, PART_LENGTH)}
          </Typography>
          <IconButton onClick={copyUserAddr} color={isCopied ? 'success' : 'primary'}>
            <UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={4} />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 5 }} />
        {userInfo.type === 'unverified' ? (
          <>
            <Stack direction='row' gap={3}>
              <UiIcon name={Icons.WarningInSquare} size={14} />
              <Typography variant='body2' sx={{ textWrap: 'pretty' }}>
                {t('account-info.unverified-text')}
              </Typography>
            </Stack>
            <Button
              variant='text'
              sx={{
                mt: 9,
                ml: 15,
                backgroundColor: 'transparent',
                color: palette.primary.dark,
                border: '1px solid',
                borderColor: palette.secondary.lighter,
                maxWidth: 230,
                p: 1,
              }}
              endIcon={<UiIcon name={Icons.ArrowUpRight} />}
            >
              {t('account-info.btn-text')}
            </Button>
          </>
        ) : (
          <Stack>
            <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 5 }}>
              {t('account-info.first-name')}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant='subtitle4'
              fontSize={18}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {userInfo.firstName}
            </Typography>
            <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 5 }}>
              {t('account-info.last-name')}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant='subtitle4'
              fontSize={18}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {userInfo.lastName}
            </Typography>
            <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 5 }}>
              {t('account-info.passport-number')}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant='subtitle4'
              fontSize={18}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {userInfo.passportNumber}
            </Typography>
            <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 5 }}>
              {t('account-info.passport-date')}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant='subtitle4'
              fontSize={18}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {userInfo.passportDate}
            </Typography>
            <Typography sx={{ fontSize: 18, color: palette.primary.light, mt: 5 }}>
              {t('account-info.user-did')}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant='subtitle4'
              fontSize={18}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {userInfo.DID}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
