import { CompanyMemberRole, CompanyStatus, CompanyType } from '@/types/literals'
import { UUID } from '@/types/primitives'
import { UserCardSchema } from '@/types/user'
import { Id } from '@/types/types'

export interface CompanyCardSchema extends Id {
  name: string
  tagline: string | null
  logoUrl: string | null
  type: CompanyType
  status: CompanyStatus
  country: string
  city: string
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
  country: string
  city: string
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
