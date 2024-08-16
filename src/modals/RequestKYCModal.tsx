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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons, Roles } from '@/enums'
import { bus, formatDateTime } from '@/helpers'
import { coreContracts, useKycManagement } from '@/modules/sdk'
import { FontWeight } from '@/theme/constants'
import { Kyc } from '@/types'
import { UiIcon } from '@/ui'

type Props = {
  isOpen: boolean
  handleClose: () => void
  info: Kyc
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.default',
  borderRadius: 4,
  p: 8,
}

const RequestKYCModal = ({ isOpen, handleClose, info }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { palette } = useTheme()
  const { t } = useTranslation()
  const { acceptRequest, rejectRequest } = useKycManagement()

  const addCorporateRole = async (addr: string) => {
    const masterAccess = coreContracts.getMasterAccessManagementContract()
    await masterAccess.grantRoles(addr, [Roles.CORPORATE])
  }

  const handleAccept = async () => {
    setIsSubmitting(true)
    try {
      await acceptRequest(info.id)
      if (info.requestType === 'company') {
        await addCorporateRole(info.address)
      }
      bus.emit(BusEvents.success, { message: 'Success' })
      handleClose()
    } catch (e) {
      console.error(e)
    }
    setIsSubmitting(false)
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    try {
      await rejectRequest(info.id, '')
    } catch (e) {
      console.error(e)
    }
    setIsSubmitting(false)
  }

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='Approve/Reject KYC role'>
      <Stack sx={style}>
        <Stack sx={{ opacity: isSubmitting ? 0.5 : 1 }}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={FontWeight.Regular}>
              {`${t('request-kyc-modal.title')} #${info.id}`}
            </Typography>
            <IconButton onClick={handleClose}>
              <UiIcon name={Icons.Close} color={palette.primary.light} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={7}>
            {t('request-kyc-modal.desc')}
          </Typography>
          <Stack direction='column' mt={8}>
            <Grid container gap={6}>
              <Grid item xs={5} direction='column'>
                <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                  {t('request-kyc-modal.role')}
                </Typography>
                <Typography variant='body2'>{info.requestType}</Typography>
              </Grid>
              <Grid item xs={5} direction='column'>
                <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                  {t('request-kyc-modal.date')}
                </Typography>
                <Typography variant='body2'>
                  {formatDateTime(new Date(info.timestamp * 1000))}
                </Typography>
              </Grid>
              <Grid xs={10} direction='column' justifyContent='flex-start'>
                <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                  {t('request-kyc-modal.email')}
                </Typography>
                <Typography variant='body2'>{info.email}</Typography>
              </Grid>
              <Grid xs={10} direction='column' justifyContent='flex-start'>
                <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                  {t('request-kyc-modal.address')}
                </Typography>
                <Typography variant='body2'>{info.address}</Typography>
              </Grid>
              {info.requestType === 'company' ? (
                <>
                  <Grid item xs={10}>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.company-name')}
                    </Typography>
                    <Typography variant='body2'>{info.companyName}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.company-address')}
                    </Typography>
                    <Typography variant='body2'>{info.companyAddress}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.company-activity')}
                    </Typography>
                    <Typography variant='body2'>{info.companyMainActivity}</Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={5} direction='column'>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.name')}
                    </Typography>
                    <Typography variant='body2'>{info.firstName}</Typography>
                  </Grid>
                  <Grid item xs={5} direction='column'>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.surname')}
                    </Typography>
                    <Typography variant='body2'>{info.lastName}</Typography>
                  </Grid>
                  <Grid item xs={5} direction='column'>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.passport-number')}
                    </Typography>
                    <Typography variant='body2'>{info.passportSerialNumber}</Typography>
                  </Grid>
                  <Grid item xs={5} direction='column'>
                    <Typography sx={{ fontSize: 16, color: palette.primary.light }}>
                      {t('request-kyc-modal.passport-date')}
                    </Typography>
                    <Typography variant='body2'>{info.passportIssuanceDate}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
            <Stack direction='row' spacing={3} mt={8} alignItems='flex-start'>
              <Button sx={{ width: 160 }} onClick={() => handleAccept()}>
                {t('request-kyc-modal.approve')}
              </Button>
              <Button
                sx={{
                  width: 160,
                  background: palette.common.white,
                  color: palette.common.black,
                  border: '1px solid',
                  '&:hover': { bgcolor: 'transparent', borderColor: palette.action.hover },
                }}
                onClick={() => handleReject()}
              >
                {t('request-kyc-modal.reject')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {isSubmitting && (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Stack>
    </Modal>
  )
}

export default RequestKYCModal
