import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NoDataView, PageTitles, UserAvatar } from '@/common'
import { Icons } from '@/enums'
import { InviteNewAdministratorModal } from '@/modals'
import { useUsers } from '@/modules/sdk'
import { UiIcon, UiTextField } from '@/ui'
type Props = HTMLAttributes<HTMLDivElement>

const Administrators = ({ ...rest }: Props) => {
  const [isInviteAdminModalOpen, setIsInviteAdminModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingFailed, setIsLoadingFailed] = useState(false)
  const { t } = useTranslation()
  const { palette } = useTheme()
  const { users, loadUsers } = useUsers({ roleIds: ['ADMIN', 'MASTER'] })

  const loadData = async () => {
    setIsLoading(true)
    setIsLoadingFailed(false)
    try {
      await loadUsers()
    } catch (e) {
      setIsLoadingFailed(true)
      console.error(e)
    }
    setIsLoading(false)
  }

  const handleClose = async () => {
    await loadData()
    setIsInviteAdminModalOpen(false)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack {...rest} alignItems='flex-start' pr={10}>
      <PageTitles
        title={t('administrators-page.title')}
        subtitle={t('administrators-page.subtitle')}
      />
      <Stack direction='row' mt={10} justifyContent='space-between' width='100%'>
        <Stack direction='row' gap={3}>
          <UiTextField
            placeholder={t('administrators-page.search')}
            sx={{ '& .MuiInputBase-root': { minHeight: 52 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <UiIcon componentName='search' sx={{ color: palette.primary.dark }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            sx={{
              borderRadius: 3,
              p: 3.5,
              border: '1px solid',
              borderColor: palette.primary.light,
            }}
          >
            <UiIcon name={Icons.ListSettingFill} color={palette.primary.light} />
          </IconButton>
        </Stack>
        <Button
          onClick={() => setIsInviteAdminModalOpen(true)}
          sx={{ color: palette.common.white }}
        >
          <UiIcon componentName='add' sx={{ mr: 2 }} />
          {t('administrators-page.invite-admin')}
        </Button>
      </Stack>
      {isLoading ? (
        <Stack minHeight='50vh' width='100%' alignItems='center' justifyContent='center' flex={1}>
          <CircularProgress color='secondary' />
        </Stack>
      ) : isLoadingFailed || users?.length === 0 ? (
        <NoDataView mt={8} />
      ) : (
        <TableContainer sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Stack direction='row' alignItems='center' spacing={4}>
                      <UserAvatar userDid={user.id} size={10} />
                      <Typography variant='body3'>{user.id}</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <InviteNewAdministratorModal isOpen={isInviteAdminModalOpen} handleClose={handleClose} />
    </Stack>
  )
}

export default Administrators
