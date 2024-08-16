import { IconButton, Modal, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Icons } from '@/enums'
import { FontWeight } from '@/theme/constants'
import { UiIcon } from '@/ui'

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

const SuccessKYCModal = ({ isOpen, handleClose }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Stack sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h5' fontWeight={FontWeight.Regular}>
            {t('success-kyc-modal.title')}
          </Typography>
          <IconButton onClick={handleClose}>
            <UiIcon name={Icons.Close} color={palette.primary.light} />
          </IconButton>
        </Stack>
        <UiIcon name={Icons.CheckCircle} size={20} sx={{ my: 5 }} color={palette.common.white} />
        <Typography sx={{ fontSize: 16, color: palette.primary.light }} mt={7}>
          {t('success-kyc-modal.desc')}
        </Typography>
      </Stack>
    </Modal>
  )
}

export default SuccessKYCModal
