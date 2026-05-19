import z from 'zod'
import {
  ApplicationStatusList,
  EmploymentTypeList,
  SalaryCurrencyList,
  SpecializationList,
  SubmissionTypeList,
  VacancyStatusList,
  WorkFormatList
} from '@/types/literals'
import { paginationSchema, uuidSchema } from '@/types/types.schemas'

export const VacancySearchSchema = z.object({
  companyId: uuidSchema.optional(),
  title: z.string().optional(),
  submissionType: z.enum(SubmissionTypeList).optional(),
  specialization: z.enum(SpecializationList).optional(),
  salaryMin: z.coerce.number().nonnegative().optional(),
  salaryMax: z.coerce.number().nonnegative().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  yearsOfExperienceMin: z.coerce.number().nonnegative().optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  status: z.enum(VacancyStatusList).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  skillIds: z.array(uuidSchema).optional()
})

export const vacancySearch = VacancySearchSchema.extend(paginationSchema.shape)

export type VacancySearch = z.infer<typeof vacancySearch>

export const ApplicationSearchSchema = z.object({
  vacancyId: uuidSchema.optional(),
  applicantId: uuidSchema.optional(),
  status: z.enum(ApplicationStatusList).optional()
})

export const applicationSearch = ApplicationSearchSchema.extend(
  paginationSchema.shape
)

export type ApplicationSearch = z.infer<typeof applicationSearch>
