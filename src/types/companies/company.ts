import {
  CompanyMemberRole,
  CompanyStatus,
  CompanyType
} from '@/types/shared/literals'
import type {
  CitySchema,
  CountrySchema
} from '@/types/location/location.schema'
import { UUID } from '@/types/shared/primitives'
import { UserCardSchema } from '@/types/users/user'
import { Id } from '@/types/shared/types'

export interface CompanyCardSchema extends Id {
  name: string
  tagline: string | null
  logoUrl: string | null
  type: CompanyType
  status: CompanyStatus
  country: CountrySchema
  city: CitySchema | null
  openVacanciesCount: number | null
}

export interface CompanySchema extends CompanyCardSchema {
  description?: string | null
  websiteUrl?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  memberCount?: number | null
  members: CompanyMemberSchema[]
}

export interface CompanyCreateRequest {
  name: string
  tagline?: string | null
  description?: string | null
  logoUrl?: string | null
  websiteUrl?: string | null
  type: CompanyType
  countryId: UUID
  cityId?: UUID | null
  contactEmail?: string | null
  contactPhone?: string | null
}

export type CompanyUpdateRequest = Partial<CompanyCreateRequest>

export interface CompanyMemberSchema extends Id {
  user: UserCardSchema
  companyId: UUID
  role: CompanyMemberRole
}

export interface CompanyMemberInviteRequest {
  userId: UUID
  role?: CompanyMemberRole
}

export interface CompanyMemberRoleUpdateRequest {
  role: CompanyMemberRole
}
