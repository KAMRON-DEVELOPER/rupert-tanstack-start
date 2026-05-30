import z, { uuidv4 } from 'zod'
import { paginationSchema } from './types.schemas'
import { CompanyStatusList, CompanyTypeList } from './literals'

const queryBooleanSchema = z.preprocess((value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}, z.boolean())

export const CompanySearchSchema = z.object({
  name: z.string().optional(),
  type: z.enum(CompanyTypeList).optional(),
  status: z.enum(CompanyStatusList).optional(),
  countryId: uuidv4().optional(),
  cityId: uuidv4().optional(),
  hasOpenVacancies: queryBooleanSchema.optional(),
  skillIds: z.array(uuidv4()).optional()
})

export const companySearch = CompanySearchSchema.extend(paginationSchema.shape)

export type CompanySearch = z.infer<typeof companySearch>
