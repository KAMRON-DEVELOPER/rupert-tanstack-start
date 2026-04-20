export const ProviderList = ['google', 'github'];
export type Provider = (typeof ProviderList)[number];

export const FollowStatusList = ['pending', 'accepted', 'declined'];
export type FollowStatus = (typeof FollowStatusList)[number];

export const FollowPolicyList = ['auto_accept', 'require_approval'];
export type FollowPolicy = (typeof FollowPolicyList)[number];

export const UserRoleList = ['user', 'admin'];
export type UserRole = (typeof UserRoleList)[number];

export const UserStatusList = ['active', 'suspended', 'pending_verification', 'deleted'];
export type UserStatus = (typeof UserStatusList)[number];

export const JobSearchStatusList = ['actively_looking', 'open_to_offers', 'interviewing', 'not_looking'];
export type JobSearchStatus = (typeof JobSearchStatusList)[number];

export const SpecializationList = [
  'frontend',
  'backend',
  'fullstack',
  'ios',
  'android',
  'cross_platform_mobile',
  'desktop',
  'embedded',
  'systems',
  'firmware',
  'devops',
  'platform',
  'sre',
  'cloud',
  'data_engineering',
  'data_science',
  'machine_learning',
  'ai_engineering',
  'data_analytics',
  'security',
  'application_security',
  'blockchain',
  'game',
  'qa',
  'ui_ux',
  'developer_relations',
  'technical_writing',
];
export type Specialization = (typeof SpecializationList)[number];

export const ProficiencyLevelList = ['beginner', 'intermediate', 'advanced', 'expert'];
export type ProficiencyLevel = (typeof ProficiencyLevelList)[number];

export const CompanyTypeList = ['startup', 'product_company', 'agency', 'outsourcing', 'outstaffing', 'enterprise', 'government'];
export type CompanyType = (typeof CompanyTypeList)[number];

export const CompanyStatusList = ['pending', 'approved', 'rejected', 'suspended'];
export type CompanyStatus = (typeof CompanyStatusList)[number];

export const CompanyMemberRoleList = ['member', 'recruiter', 'owner'];
export type CompanyMemberRole = (typeof CompanyMemberRoleList)[number];

export const PaymentFrequencyList = ['hourly', 'daily', 'once_a_week', 'twice_a_month', 'once_a_month', 'per_project'];
export type PaymentFrequency = (typeof PaymentFrequencyList)[number];

export const WorkFormatList = ['onsite', 'remote', 'hybrid'];
export type WorkFormat = (typeof WorkFormatList)[number];

export const EmploymentTypeList = ['full_time', 'part_time', 'contract', 'internship'];
export type EmploymentType = (typeof EmploymentTypeList)[number];

export const SubmissionTypeList = ['profile', 'resume'];
export type SubmissionType = (typeof SubmissionTypeList)[number];

export const VacancyStatusList = ['draft', 'open', 'archived', 'closed'];
export type VacancyStatus = (typeof VacancyStatusList)[number];

export const ApplicationStatusList = ['pending', 'viewed', 'shortlisted', 'interview', 'offer', 'rejected', 'hired'] as const;
export type ApplicationStatus = (typeof ApplicationStatusList)[number];

export const SalaryCurrencyList = ['UZS', 'KZT', 'KGS', 'TJS', 'TMT', 'USD', 'EUR', 'TRY'] as const;
export type SalaryCurrency = (typeof SalaryCurrencyList)[number];
