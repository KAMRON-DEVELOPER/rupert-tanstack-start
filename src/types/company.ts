import { CompanyMemberRole, CompanyStatus, CompanyType } from '@/types/literals';
import { UUID } from '@/types/primitives';
import { UserCardSchema } from '@/types/user';
import { Id } from '@/types/types';

export interface CompanyCardSchema extends Id {
  name: string;
  tagline?: string;
  logoUrl?: string;
  type: CompanyType;
  status: CompanyStatus;
  country: string;
  city: string;
  openVacanciesCount?: number;
}

export interface CompanySchema extends CompanyCardSchema {
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  memberCount?: number;
}

export interface CompanyMemberSchema {
  user: UserCardSchema;
  companyId: UUID;
  role: CompanyMemberRole;
}
