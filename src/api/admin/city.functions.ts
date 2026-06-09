import { createServerApi } from '@/api/api.server'
import { cityRequestSchema, cityResponseSchema } from '@/types/shared/location'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

export const createCityFn = createServerFn({ method: 'POST' })
  .inputValidator(cityRequestSchema.extend({ countryId: z.uuid() }))
  .handler(async ({ data: { countryId, ...data } }) => {
    const api = createServerApi()

    const response = await api(`admin/locations/${countryId}/cities`, {
      method: 'POST',
      data
    })

    const result = cityResponseSchema.safeParse(response)

    if (!result.success) {
      console.error('[cityResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[cityResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const updateCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    cityRequestSchema.extend({
      countryId: z.uuid(),
      cityId: z.uuid()
    })
  )
  .handler(async ({ data: { countryId, cityId, ...data } }) => {
    const api = createServerApi()

    await api(`admin/locations/${countryId}/cities/${cityId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      countryId: z.uuid(),
      cityId: z.uuid()
    })
  )
  .handler(async ({ data: { countryId, cityId } }) => {
    const api = createServerApi()
    await api(`admin/locations/${countryId}/cities/${cityId}`, {
      method: 'DELETE'
    })
  })
