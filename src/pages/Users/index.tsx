import {
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NoDataView, PageTitles, UserAvatar } from '@/common'
import { useUsers } from '@/modules/sdk'

type Props = HTMLAttributes<HTMLDivElement>

const Users = ({ ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingFailed, setIsLoadingFailed] = useState(false)
  const { t } = useTranslation()
  const { users, loadUsers } = useUsers()

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

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles title={t('users-page.title')} subtitle={t('users-page.subtitle')} />
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
    </Stack>
  )
}

export default Users
