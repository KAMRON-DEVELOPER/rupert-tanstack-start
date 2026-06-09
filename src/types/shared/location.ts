import { z } from 'zod'
import { uuid } from './primitives'
import { baseSchema } from './base'
import { PaginatedResponseSchema } from './pagination'

// --- Requests ---
export const locationRequestSchema = z.object({
  countryId: uuid,
  cityId: uuid.optional()
})

export const nullableLocationRequestSchema = z.object({
  countryId: uuid.optional(),
  cityId: uuid.optional()
})

export const countryCreateRequestSchema = z.object({
  code: z
    .string()
    .trim()
    .length(2)
    .transform((code) => code.toUpperCase()),
  name: z.string().trim().min(1).max(56)
})

export const countryUpdateRequestSchema = z.object({
  code: z
    .string()
    .trim()
    .length(2)
    .transform((code) => code.toUpperCase())
    .optional(),
  name: z.string().trim().min(1).max(56).optional()
})

export const cityRequestSchema = z.object({
  name: z.string().trim().min(1).max(168)
})

// --- Responses ---
export const countryResponseSchema = baseSchema.extend({
  code: z.string(),
  name: z.string()
})

export const cityResponseSchema = baseSchema.extend({
  countryId: uuid,
  name: z.string()
})

export const baseLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema,
  city: cityResponseSchema.optional()
})

export const baseNullableLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema.optional(),
  city: cityResponseSchema.optional()
})

// --- List Responses ---
export const countryListResponseSchema = PaginatedResponseSchema(
  countryResponseSchema
)

export const cityListResponseSchema =
  PaginatedResponseSchema(cityResponseSchema)

// ---- Types ----
export type LocationRequest = z.infer<typeof locationRequestSchema>
export type NullableLocationRequest = z.infer<
  typeof nullableLocationRequestSchema
>
export type CountryCreateRequest = z.infer<typeof countryCreateRequestSchema>
export type CountryUpdateRequest = z.infer<typeof countryUpdateRequestSchema>
export type CityRequest = z.infer<typeof cityRequestSchema>
export type CountryResponse = z.infer<typeof countryResponseSchema>
export type CityResponse = z.infer<typeof cityResponseSchema>
export type BaseLocationResponse = z.infer<typeof baseLocationResponseSchema>
export type BaseNullableLocationResponse = z.infer<
  typeof baseNullableLocationResponseSchema
>
