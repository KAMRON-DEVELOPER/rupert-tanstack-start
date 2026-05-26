import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createCityFn,
  createCountryFn,
  createSkillFn,
  updateCityFn,
  updateCountryFn,
  updateSkillFn
} from './admin.functions'
import type {
  CountryCreateRequest,
  CreateCityVariables,
  SkillRequest,
  UpdateCityVariables,
  UpdateCountryVariables,
  UpdateSkillVariables
} from '@/types/admin.schema'

export const useCreateCountryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CountryCreateRequest) => createCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['countries']
      })
    }
  })
}

export const useUpdateCountryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateCountryVariables) => updateCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['countries']
      })
    }
  })
}

export const useCreateCityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCityVariables) => createCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}

export const useUpdateCityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateCityVariables) => updateCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SkillRequest) => createSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateSkillVariables) => updateSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}
