import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createCountryFn,
  deleteCountryFn,
  updateCountryFn
} from './country.functions'
import {
  CountryCreateRequest,
  CountryUpdateRequest
} from '@/types/shared/location'

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
    mutationFn: (data: CountryUpdateRequest & { countryId: string }) =>
      updateCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['countries']
      })
    }
  })
}

export const useDeleteCountryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { countryId: string }) => deleteCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}
