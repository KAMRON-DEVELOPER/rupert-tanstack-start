import { CompanyType, JobSearchStatus, Specialization, VacancyStatus } from '@/types/literals';

export interface BucketBase {
  count: number;
  percentage: number;
}

export interface JobSearchStatusBucket extends BucketBase {
  key: JobSearchStatus;
}

export interface SpecializationBucket extends BucketBase {
  key: Specialization;
}

export interface VacancyStatusBucket extends BucketBase {
  key: VacancyStatus;
}

export interface CompanyTypeBucket extends BucketBase {
  key: CompanyType;
}

export interface DailyActiveUsersBucket {
  count: number;
  date: string; // ISO date, e.g. "2026-04-18"
}

export interface UsersStats {
  total: number;

  lookingForJobCount: number;
  lookingForJobPercentage: number;

  dauChart: DailyActiveUsersBucket[];

  byJobSearchStatus: JobSearchStatusBucket[];
  bySpecialization: SpecializationBucket[];
}

export interface VacanciesStats {
  total: number;

  open: number;

  byStatus: VacancyStatusBucket[];
  bySpecialization: SpecializationBucket[];
}

export interface CompaniesStats {
  total: number;

  byType: CompanyTypeBucket[];
}

export interface Stats {
  users: UsersStats;
  vacancies: VacanciesStats;
  companies: CompaniesStats;
}
