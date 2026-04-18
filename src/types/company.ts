import { CompanyMemberRole, CompanyStatus, CompanyType } from '@/types/literals';
import { UUID } from '@/types/primitives';
import { UserCard } from '@/types/user';

export interface CompanyCard {
  name: string;
  tagline?: string;
  logo_url?: string;
  type: CompanyType;
  country: string;
  city: string;
  status: CompanyStatus;
}

export interface Company {
  description?: string;
  website_url?: string;
  contact_email?: string;
  contact_phone?: string;

  member_count?: number;
  open_vacancy_count?: number;
}

export interface CompanyMember {
  user: UserCard;
  company_id: UUID;
  role: CompanyMemberRole;
}
