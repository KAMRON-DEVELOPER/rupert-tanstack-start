import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'
import {
  countryCreateRequestSchema,
  countryResponseSchema,
  countryUpdateRequestSchema
} from '@/types/shared/location'
import z from 'zod'
import { MessageResponse } from '@/types/shared/types'

export const createCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(countryCreateRequestSchema)
  .handler(async ({ data }) => {
    const api = createServerApi()

    const response = await api('admin/locations/countries', {
      method: 'POST',
      data
    })

    const result = countryResponseSchema.safeParse(response)

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

export const updateCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(countryUpdateRequestSchema.extend({ countryId: z.uuid() }))
  .handler(async ({ data: { countryId, ...data } }) => {
    const api = createServerApi()

    await api<MessageResponse>(`admin/locations/countries/${countryId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ countryId: z.uuid() }))
  .handler(async ({ data: { countryId } }) => {
    const api = createServerApi()

    await api(`admin/locations/countries/${countryId}`, {
      method: 'DELETE'
    })
  })
