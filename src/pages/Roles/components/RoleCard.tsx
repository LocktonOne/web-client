import { Chip, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { FontWeight } from '@/theme/constants'

type Props = {
  title: string
  desc: string
  permissions: string[]
}

const style = {
  borderRadius: 4,
  p: 5,
  direction: 'column',
  border: '1px solid',
  borderColor: 'secondary.light',
  height: 250,
}

const SuccessKYCModal = ({ title, desc, permissions }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

  return (
    <Stack sx={style}>
      <Typography variant='h5' fontWeight={FontWeight.SemiBold}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: palette.primary.light }} mt={3}>
        {desc}
      </Typography>
      <Typography variant='body3' mt={4}>
        {t('role-card.permissions')}
      </Typography>
      <Stack direction='column' spacing={2} mt={4} alignItems='flex-start'>
        {permissions.map((permission, idx) => (
          <Chip key={idx} size='medium' label={permission} />
        ))}
      </Stack>
    </Stack>
  )
}

export default SuccessKYCModal
