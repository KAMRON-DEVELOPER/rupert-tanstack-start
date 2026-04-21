import { CompanyMemberRole, CompanyStatus, CompanyType } from '@/types/literals';
import { UUID } from '@/types/primitives';
import { UserCardSchema } from '@/types/user';
import { Id } from '@/types/types';

export interface CompanyCardSchema extends Id {
  name: string;
  tagline?: string;
  logoUrl?: string;
  type: CompanyType;
  country: string;
  city: string;
  status: CompanyStatus;
}

export interface CompanySchema {
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;

  memberCount?: number;
  openVacancyCount?: number;
}

export interface CompanyMemberSchema {
  user: UserCardSchema;
  companyId: UUID;
  role: CompanyMemberRole;
}
