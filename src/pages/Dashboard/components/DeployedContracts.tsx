import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NoDataView } from '@/common'
import { Icons } from '@/enums'
import { useTokensListContext } from '@/hooks'
import { DeployNewContractModal } from '@/modals'
import { UiIcon } from '@/ui'

const DeployedContracts = () => {
  const [isDeployContractOpen, setIsDeployContractOpen] = useState(false)
  const { palette } = useTheme()
  const { t } = useTranslation()
  const { tokensList } = useTokensListContext()

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
        <Stack
          sx={{ overflowY: 'scroll' }}
          direction='column'
          justifyContent='flex-start'
          height={130}
          gap={2}
        >
          {tokensList.length ? (
            tokensList.map((token, idx) => (
              <Stack
                sx={{
                  border: '1px solid',
                  borderColor: palette.secondary.light,
                  borderRadius: 2,
                  width: '100%',
                  px: 3,
                  py: 2,
                }}
                direction='row'
                alignItems='center'
                gap={2}
                key={idx}
              >
                <UiIcon name={Icons.DeployedContracts} color={palette.secondary.light} size={4} />
                <Typography variant='body3'>{token.name}</Typography>
              </Stack>
            ))
          ) : (
            <NoDataView />
          )}
        </Stack>
        <Stack direction='row' gap={3} mt={7}>
          <Button sx={{ width: 200 }} onClick={() => setIsDeployContractOpen(true)}>
            {t('deployed-contracts.new-contract')}
          </Button>
        </Stack>
      </Stack>
      <DeployNewContractModal
        isOpen={isDeployContractOpen}
        handleClose={() => setIsDeployContractOpen(false)}
      />
    </Stack>
  )
}

export default DeployedContracts
