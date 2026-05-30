import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import {
  CityRequestSchema,
  CountryCreateRequestSchema,
  CountryUpdateRequestSchema,
  SkillRequestSchema,
  AdminCountrySchema,
  AdminCitySchema,
  type CountryCreateRequest,
  type CreateCityVariables,
  type UpdateCityVariables,
  type UpdateCountryVariables,
  type UpdateSkillVariables,
  type SkillRequest,
  type DeleteCountryVariables,
  type DeleteCityVariables,
  type DeleteSkillVariables
} from '@/types/admin.schema'

export const createCountryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: CountryCreateRequest) =>
    CountryCreateRequestSchema.parse(data)
  )
  .handler(async ({ data }) => {
    const api = createServerApi()
    const response = await api('admin/locations/countries', {
      method: 'POST',
      data
    })
    return AdminCountrySchema.parse(response)
  })

export const updateCountryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: UpdateCountryVariables) => ({
    countryId: data.countryId,
    data: CountryUpdateRequestSchema.parse(data.data)
  }))
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/locations/countries/${data.countryId}`, {
      method: 'PATCH',
      data: data.data
    })
  })

export const createCityFn = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateCityVariables) => ({
    countryId: data.countryId,
    data: CityRequestSchema.parse(data.data)
  }))
  .handler(async ({ data }) => {
    const api = createServerApi()
    const response = await api(`admin/locations/${data.countryId}/cities`, {
      method: 'POST',
      data: data.data
    })
    return AdminCitySchema.parse(response)
  })

export const updateCityFn = createServerFn({ method: 'POST' })
  .inputValidator((data: UpdateCityVariables) => ({
    countryId: data.countryId,
    cityId: data.cityId,
    data: CityRequestSchema.parse(data.data)
  }))
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/locations/${data.countryId}/cities/${data.cityId}`, {
      method: 'PATCH',
      data: data.data
    })
  })

export const createSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SkillRequest) => SkillRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const api = createServerApi()
    const response = await api('admin/skills', {
      method: 'POST',
      data
    })
    response
  })

export const updateSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: UpdateSkillVariables) => ({
    skillId: data.skillId,
    data: SkillRequestSchema.parse(data.data)
  }))
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/skills/${data.skillId}`, {
      method: 'PATCH',
      data: data.data
    })
  })

export const deleteCountryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: DeleteCountryVariables) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/locations/countries/${data.countryId}`, {
      method: 'DELETE'
    })
  })

export const deleteCityFn = createServerFn({ method: 'POST' })
  .inputValidator((data: DeleteCityVariables) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/locations/${data.countryId}/cities/${data.cityId}`, {
      method: 'DELETE'
    })
  })

export const deleteSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: DeleteSkillVariables) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    await api(`admin/skills/${data.skillId}`, {
      method: 'DELETE'
    })
  })
