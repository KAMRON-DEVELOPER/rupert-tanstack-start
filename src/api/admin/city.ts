import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCityFn, deleteCityFn, updateCityFn } from './city.functions'
import { CityRequest } from '@/types/shared/location'

export const useCreateCityMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CityRequest & { countryId: string }) =>
      createCityFn({ data }),
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
    mutationFn: (data: CityRequest & { countryId: string; cityId: string }) =>
      updateCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}

export const useDeleteCityMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { countryId: string; cityId: string }) =>
      deleteCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}
