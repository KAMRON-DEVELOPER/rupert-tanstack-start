import { uuidv4, z } from 'zod'
import {
  cityResponseSchema,
  countryResponseSchema
} from '../location/location.schema'

export const CityRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(168)
  })
  .strict()

export type CityRequest = z.infer<typeof CityRequestSchema>

export const CountryCreateRequestSchema = z
  .object({
    code: z
      .string()
      .trim()
      .length(2)
      .transform((code) => code.toUpperCase()),
    name: z.string().trim().min(1).max(56)
  })
  .strict()

export type CountryCreateRequest = z.infer<typeof CountryCreateRequestSchema>

export const CountryUpdateRequestSchema = z
  .object({
    code: z
      .string()
      .trim()
      .length(2)
      .transform((code) => code.toUpperCase())
      .nullable()
      .optional(),
    name: z.string().trim().min(1).max(56).nullable().optional()
  })
  .strict()

export type CountryUpdateRequest = z.infer<typeof CountryUpdateRequestSchema>

export const SkillRequestSchema = z.object({
  name: z.string().trim().min(1).max(64)
})

export type SkillRequest = z.infer<typeof SkillRequestSchema>

export const AdminCountrySchema = countryResponseSchema
export type AdminCountry = z.infer<typeof AdminCountrySchema>

export const AdminCitySchema = cityResponseSchema
export type AdminCity = z.infer<typeof AdminCitySchema>

export const AdminSkillSchema = SkillRequestSchema.extend({
  id: uuidv4(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime()
}).transform(({ created_at, updated_at, ...rest }) => ({
  ...rest,
  createdAt: created_at,
  updatedAt: updated_at
}))

export type AdminSkill = z.infer<typeof AdminSkillSchema>

export type CreateCityVariables = {
  countryId: string
  data: CityRequest
}

export type UpdateCityVariables = CreateCityVariables & {
  cityId: string
}

export type UpdateCountryVariables = {
  countryId: string
  data: CountryUpdateRequest
}

export type UpdateSkillVariables = {
  skillId: string
  data: SkillRequest
}

export type DeleteCountryVariables = {
  countryId: string
}

export type DeleteCityVariables = {
  countryId: string
  cityId: string
}

export type DeleteSkillVariables = {
  skillId: string
}
