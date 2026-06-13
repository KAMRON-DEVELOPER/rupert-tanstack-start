import type {
  CityResponse as CitySchema,
  CountryResponse as CountrySchema
} from '@/types/shared/location'

export const locationLabel = (
  country: CountrySchema | null | undefined,
  city?: CitySchema | null | undefined
) => [city?.name, country?.name].filter(Boolean).join(', ')
