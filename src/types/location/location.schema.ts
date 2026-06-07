import z, { uuidv4 } from 'zod'

export const countryResponseSchema = z.object({
  id: uuidv4(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  code: z.string(),
  name: z.string()
})

export const cityResponseSchema = z.object({
  id: uuidv4(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  countryId: uuidv4(),
  name: z.string()
})

export const locationRequestSchema = z
  .object({
    countryId: uuidv4(),
    cityId: uuidv4().nullable().optional().default(null)
  })
  .strict()

export const nullableLocationRequestSchema = z
  .object({
    countryId: uuidv4().nullable().optional().default(null),
    cityId: uuidv4().nullable().optional().default(null)
  })
  .strict()

export const countryListResponseSchema = z.object({
  data: z.array(countryResponseSchema),
  total: z.number()
})

export const cityListResponseSchema = z.object({
  data: z.array(cityResponseSchema),
  total: z.number()
})

export type CountrySchema = z.infer<typeof countryResponseSchema>
export type CitySchema = z.infer<typeof cityResponseSchema>
export type LocationRequest = z.infer<typeof locationRequestSchema>
export type NullableLocationRequest = z.infer<
  typeof nullableLocationRequestSchema
>
