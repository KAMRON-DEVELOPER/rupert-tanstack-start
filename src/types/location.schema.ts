import z from 'zod'
import { uuidSchema } from './types.schemas'

export const countryResponseSchema = z.object({
  id: uuidSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  code: z.string(),
  name: z.string()
})

export const cityResponseSchema = z.object({
  id: uuidSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  countryId: uuidSchema,
  name: z.string()
})

export const locationRequestSchema = z
  .object({
    countryId: uuidSchema,
    cityId: uuidSchema.nullable().optional().default(null)
  })
  .strict()

export const nullableLocationRequestSchema = z
  .object({
    countryId: uuidSchema.nullable().optional().default(null),
    cityId: uuidSchema.nullable().optional().default(null)
  })
  .strict()

export const countryListResponseSchema = z.array(countryResponseSchema)
export const cityListResponseSchema = z.array(cityResponseSchema)

export type CountrySchema = z.infer<typeof countryResponseSchema>
export type CitySchema = z.infer<typeof cityResponseSchema>
export type LocationRequest = z.infer<typeof locationRequestSchema>
export type NullableLocationRequest = z.infer<
  typeof nullableLocationRequestSchema
>
