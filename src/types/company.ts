import { CompanyMemberRole, CompanyStatus, CompanyType } from '@/types/literals';
import { UUID } from '@/types/primitives';
import { UserCard } from '@/types/user';
import { Id } from '@/types/types';

export interface CompanyCard extends Id {
  name: string;
  tagline?: string;
  logoUrl?: string;
  type: CompanyType;
  country: string;
  city: string;
  status: CompanyStatus;
}

export interface Company {
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;

  memberCount?: number;
  openVacancyCount?: number;
}

export interface CompanyMember {
  user: UserCard;
  companyId: UUID;
  role: CompanyMemberRole;
}
