import type {
  CitySchema,
  CountrySchema
} from '@/types/location/location.schema'

export const locationLabel = (
  country: CountrySchema | null,
  city?: CitySchema | null
) => [city?.name, country?.name].filter(Boolean).join(', ')
