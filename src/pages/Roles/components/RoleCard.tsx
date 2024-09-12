import { Chip, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { FontWeight } from '@/theme/constants'

type resource = {
  id: string
  name: string
  allows: string[]
  disallows: string[]
}

type Props = {
  title: string
  resources: resource[]
}

const style = {
  borderRadius: 4,
  p: 5,
  direction: 'column',
  border: '1px solid',
  borderColor: 'secondary.light',
  minHeight: 250,
}

const SuccessKYCModal = ({ title, resources }: Props) => {
  const { t } = useTranslation()

  return (
    <Stack sx={style}>
      <Typography variant='h6' fontWeight={FontWeight.SemiBold}>
        {title}
      </Typography>
      <Typography variant='body3' mt={4}>
        {t('role-card.resources')}
      </Typography>
      <Stack direction='column' spacing={2} mt={4} alignItems='flex-start'>
        {resources.map((resource, idx) => (
          <Stack key={idx}>
            <Typography variant='body3'>
              {resource.name === '*' ? 'All resources' : resource.name}
            </Typography>
            <Stack direction='row' gap={2} alignItems='center'>
              <Typography variant='caption1'>Allow:</Typography>
              {resource.allows.map((label, index) => (
                <Chip key={index} size='small' label={label === '*' ? 'All' : label} />
              ))}
            </Stack>
            {Boolean(resource.disallows.length) && (
              <Stack direction='row' gap={2}>
                <Typography variant='caption1' alignItems='center'>
                  Disallows:
                </Typography>
                {resource.disallows.map((label, index) => (
                  <Chip key={index} size='small' label={label === '*' ? 'All' : label} />
                ))}
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default SuccessKYCModal
