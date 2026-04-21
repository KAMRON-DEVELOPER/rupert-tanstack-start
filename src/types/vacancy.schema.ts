import z from 'zod';
import {
  ApplicationStatusList,
  EmploymentTypeList,
  SalaryCurrencyList,
  SpecializationList,
  SubmissionTypeList,
  VacancyStatusList,
  WorkFormatList,
} from '@/types/literals';
import { paginationSchema } from '@/types/types.schemas';

export const VacancySearchSchema = z.object({
  companyId: z.uuidv4().optional(),
  title: z.string().optional(),
  submissionType: z.enum(SubmissionTypeList).optional(),
  specialization: z.enum(SpecializationList).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  yearsOfExperienceMin: z.number().positive().optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  status: z.enum(VacancyStatusList).catch('open').optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  skillIds: z.array(z.uuidv4()).optional(),
});

export const vacancySearch = VacancySearchSchema.extend(paginationSchema.shape);

export type VacancySearch = z.infer<typeof vacancySearch>;

export const ApplicationSearchSchema = z.object({
  vacancyId: z.uuidv4(),
  applicant_id: z.uuidv4(),
  status: z.enum(ApplicationStatusList),
});

export const applicationSearch = ApplicationSearchSchema.extend(paginationSchema.shape);

export type ApplicationSearch = z.infer<typeof applicationSearch>;
