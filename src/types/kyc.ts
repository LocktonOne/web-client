import { type RequestsStatuses } from '@/enums'

export type RequestDescriptionKyc = {
  firstName: string
  lastName: string
  passportSerialNumber: string
  passportIssuanceDate: string
}
export type RequestDescriptionCompanyKyc = {
  companyName: string
  companyAddress: string
  companyMainActivity: string
}

export type Kyc = {
  id: string
  status: RequestsStatuses
  address: string
  timestamp: number
  rejectReason?: string
  passportSerialNumber?: string
  firstName?: string
  lastName?: string
  passportIssuanceDate?: string
}
