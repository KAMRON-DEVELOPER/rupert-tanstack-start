import type {
  CityResponse as CitySchema,
  CountryResponse as CountrySchema
} from '@/types/shared/location'

export const locationLabel = (
  country: CountrySchema | null,
  city?: CitySchema | null
) => [city?.name, country?.name].filter(Boolean).join(', ')
