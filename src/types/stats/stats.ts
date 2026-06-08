import z from 'zod'
import { isoDate } from '@/types/shared/primitives'
import {
  CompanyTypeList,
  JobSearchStatusList,
  SpecializationList,
  VacancyStatusList
} from '@/types/shared/literals'

// --- Buckets
const bucketBaseSchema = z.object({
  count: z.number().int(),
  percentage: z.number()
})

export const jobSearchStatusBucketSchema = bucketBaseSchema.extend({
  key: z.enum(JobSearchStatusList)
})

export const specializationBucketSchema = bucketBaseSchema.extend({
  key: z.enum(SpecializationList)
})

export const vacancyStatusBucketSchema = bucketBaseSchema.extend({
  key: z.enum(VacancyStatusList)
})

export const companyTypeBucketSchema = bucketBaseSchema.extend({
  key: z.enum(CompanyTypeList)
})

export const dailyActiveUsersBucketSchema = z.object({
  count: z.number().int(),
  anonymousCount: z.number().int(),
  date: isoDate
})

export const usersStatsSchema = z.object({
  total: z.number().int(),
  lookingForJobCount: z.number().int(),
  lookingForJobPercentage: z.number(),
  dauChart: z.array(dailyActiveUsersBucketSchema),
  byJobSearchStatus: z.array(jobSearchStatusBucketSchema),
  bySpecialization: z.array(specializationBucketSchema)
})

export const vacanciesStatsSchema = z.object({
  total: z.number().int(),
  open: z.number().int(),
  byStatus: z.array(vacancyStatusBucketSchema),
  bySpecialization: z.array(specializationBucketSchema)
})

export const companiesStatsSchema = z.object({
  total: z.number().int(),
  byType: z.array(companyTypeBucketSchema)
})

export const statsSchema = z.object({
  users: usersStatsSchema,
  vacancies: vacanciesStatsSchema,
  companies: companiesStatsSchema
})

export type JobSearchStatusBucket = z.infer<typeof jobSearchStatusBucketSchema>
export type SpecializationBucket = z.infer<typeof specializationBucketSchema>
export type VacancyStatusBucket = z.infer<typeof vacancyStatusBucketSchema>
export type CompanyTypeBucket = z.infer<typeof companyTypeBucketSchema>
export type DailyActiveUsersBucket = z.infer<
  typeof dailyActiveUsersBucketSchema
>
export type UsersStats = z.infer<typeof usersStatsSchema>
export type VacanciesStats = z.infer<typeof vacanciesStatsSchema>
export type CompaniesStats = z.infer<typeof companiesStatsSchema>
export type Stats = z.infer<typeof statsSchema>
