import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  cityResponseSchema,
  countryResponseSchema
} from '@/types/shared/location'
import {
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import z from 'zod'

export const getCountriesFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('locations/countries', { params })

    const result = paginatedResponseSchema(countryResponseSchema).safeParse(
      data
    )

    if (!result.success) {
      console.error(
        '[countryResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[countryResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getCitiesFn = createServerFn()
  .inputValidator(paginationQuerySchema.extend({ countryId: z.string() }))
  .handler(async ({ data: { countryId, ...params } }) => {
    const api = createServerApi()

    const data = await api(`locations/countries/${countryId}/cities`, {
      params
    })

    const result = paginatedResponseSchema(cityResponseSchema).safeParse(data)

    if (!result.success) {
      console.error('[cityResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[cityResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
