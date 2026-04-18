export type Provider = 'google' | 'github';

export type FollowStatus = 'pending' | 'accepted' | 'declined';

export type FollowPolicy = 'auto_accept' | 'require_approval';

export type UserRole = 'user' | 'admin';

export type UserStatus = 'active' | 'suspended' | 'pending_verification' | 'deleted';

export type JobSearchStatus = 'actively_looking' | 'open_to_offers' | 'interviewing' | 'not_looking';

export type Specialization =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'ios'
  | 'android'
  | 'cross_platform_mobile'
  | 'desktop'
  | 'embedded'
  | 'systems'
  | 'firmware'
  | 'devops'
  | 'platform'
  | 'sre'
  | 'cloud'
  | 'data_engineering'
  | 'data_science'
  | 'machine_learning'
  | 'ai_engineering'
  | 'data_analytics'
  | 'security'
  | 'application_security'
  | 'blockchain'
  | 'game'
  | 'qa'
  | 'ui_ux'
  | 'developer_relations'
  | 'technical_writing';

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type CompanyType = 'startup' | 'product_company' | 'agency' | 'outsourcing' | 'outstaffing' | 'enterprise' | 'government';

export type CompanyStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type CompanyMemberRole = 'member' | 'recruiter' | 'owner';

export type PaymentFrequency = 'hourly' | 'daily' | 'once_a_week' | 'twice_a_month' | 'once_a_month' | 'per_project';

export type WorkFormat = 'onsite' | 'remote' | 'hybrid';

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';

export type SubmissionType = 'profile' | 'resume';

export type VacancyStatus = 'draft' | 'open' | 'archived' | 'closed';

export type ApplicationStatus = 'pending' | 'viewed' | 'shortlisted' | 'interview' | 'offer' | 'rejected' | 'hired';

export type SalaryCurrency = 'UZS' | 'KZT' | 'KGS' | 'TJS' | 'TMT' | 'USD' | 'EUR' | 'TRY';
