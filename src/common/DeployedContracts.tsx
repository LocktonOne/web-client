import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

import NoDataView from './NoDataView'

type Props = {
  handleOpenModal: () => void
}

const DeployedContracts = ({ handleOpenModal }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation()

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
          <UiIcon name={Icons.DeployedContracts} size={6} />
          <Typography variant='subtitle3'>{t('deployed-contracts.title')}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 5, borderColor: palette.secondary.light }} />
      <Stack>
        <Stack direction='row' alignItems='center' minHeight={100}>
          <NoDataView />
        </Stack>
        <Stack direction='row' gap={3} mt={7}>
          <Button sx={{ width: 200 }} onClick={handleOpenModal}>
            {t('deployed-contracts.new-contract')}
          </Button>
          <Button
            variant='text'
            sx={{
              width: 200,
              background: palette.common.white,
              color: palette.primary.dark,
              borderColor: palette.primary.dark,
              border: '1px solid',
            }}
          >
            <UiIcon name={Icons.ArrowUpRight} size={5} mr={2} />
            {t('deployed-contracts.view-all')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DeployedContracts
