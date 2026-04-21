import { CompanyType, JobSearchStatus, Specialization, VacancyStatus } from '@/types/literals';

export interface BucketBase {
  count: number;
  percentage: number;
}

export interface JobSearchStatusBucketSchema extends BucketBase {
  key: JobSearchStatus;
}

export interface SpecializationBucketSchema extends BucketBase {
  key: Specialization;
}

export interface VacancyStatusBucketSchema extends BucketBase {
  key: VacancyStatus;
}

export interface CompanyTypeBucketSchema extends BucketBase {
  key: CompanyType;
}

export interface DailyActiveUsersBucketSchema {
  count: number;
  date: string; // ISO date, e.g. "2026-04-18"
}

export interface UsersStatsSchema {
  total: number;

  lookingForJobCount: number;
  lookingForJobPercentage: number;

  dauChart: DailyActiveUsersBucketSchema[];

  byJobSearchStatus: JobSearchStatusBucketSchema[];
  bySpecialization: SpecializationBucketSchema[];
}

export interface VacanciesStatsSchema {
  total: number;

  open: number;

  byStatus: VacancyStatusBucketSchema[];
  bySpecialization: SpecializationBucketSchema[];
}

export interface CompaniesStatsSchema {
  total: number;

  byType: CompanyTypeBucketSchema[];
}

export interface StatsSchema {
  users: UsersStatsSchema;
  vacancies: VacanciesStatsSchema;
  companies: CompaniesStatsSchema;
}
