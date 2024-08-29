import {
  CircularProgress,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material'
import { HTMLAttributes, SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NoDataView, PageTitles } from '@/common'
import { RequestsStatuses } from '@/enums'
import { formatDateTime } from '@/helpers'
import { RequestKYCModal } from '@/modals'
import { useKycManagement } from '@/modules/sdk'
import { Kyc } from '@/types'
type Props = HTMLAttributes<HTMLDivElement>

const KycRequests = ({ ...rest }: Props) => {
  const [activeTab, setActiveTab] = useState<RequestsStatuses>(RequestsStatuses.NONE)
  const { t } = useTranslation()
  const {
    loadAllKyc,
    pendingKyc,
    rejectedKyc,
    actualKyc,
    isLoading,
    kycList,
    setKycList,
    isLoadingError,
  } = useKycManagement()
  const [activeKyc, setActiveKyc] = useState<Kyc | null>(null)

  const requestStatusToText = (status: RequestsStatuses) => {
    switch (status) {
      case RequestsStatuses.ACCEPTED:
        return 'Accepted'
      case RequestsStatuses.REJECTED:
        return 'Rejected'
      case RequestsStatuses.PENDING:
        return 'Pending'
      case RequestsStatuses.DROPPED:
        return 'Dropped'
      default:
        return 'None'
    }
  }

  const handleChange = (event: SyntheticEvent, newValue: RequestsStatuses) => {
    setActiveTab(newValue)
    switch (newValue) {
      case RequestsStatuses.NONE:
        setKycList([...actualKyc, ...pendingKyc, ...rejectedKyc])
        break
      case RequestsStatuses.ACCEPTED:
        setKycList(actualKyc)
        break
      case RequestsStatuses.PENDING:
        setKycList(pendingKyc)
        break
      case RequestsStatuses.REJECTED:
        setKycList(rejectedKyc)
        break
    }
  }

  useEffect(() => {
    loadAllKyc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Stack {...rest} alignItems='flex-start'>
      <PageTitles title={t('kyc-requests-page.title')} subtitle={t('kyc-requests-page.subtitle')} />
      <Stack width='100%' mt={8} px={8} alignItems='flex-end'>
        <Tabs onChange={handleChange} value={activeTab}>
          <Tab label='All' value={RequestsStatuses.NONE} />
          <Tab label='Pending' value={RequestsStatuses.PENDING} />
          <Tab label='Accepted' value={RequestsStatuses.ACCEPTED} />
          <Tab label='Rejected' value={RequestsStatuses.REJECTED} />
        </Tabs>
      </Stack>
      {isLoadingError || kycList?.length === 0 ? (
        <NoDataView mt={8} />
      ) : isLoading ? (
        <Stack minHeight='50vh' width='100%' alignItems='center' justifyContent='center' flex={1}>
          <CircularProgress color='secondary' />
        </Stack>
      ) : (
        <TableContainer sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Creation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kycList?.map((item, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => setActiveKyc(item)}
                >
                  <TableCell component='th' scope='row'>
                    {item.address}
                  </TableCell>
                  <TableCell>{requestStatusToText(item.status)}</TableCell>
                  <TableCell>{formatDateTime(new Date(item.timestamp * 1000))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {activeKyc && (
        <RequestKYCModal
          isOpen={Boolean(activeKyc)}
          handleClose={() => setActiveKyc(null)}
          info={activeKyc!}
        />
      )}
    </Stack>
  )
}

export default KycRequests
