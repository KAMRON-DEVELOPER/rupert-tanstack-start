import { useQuery } from '@tanstack/react-query'
import {
  useGetCountriesQueryOptions,
  useGetCitiesQueryOptions
} from '@/services/locations/locations'
import {
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useCreateCityMutation,
  useUpdateCityMutation
} from '@/services/admin/admin'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, ChevronRight, MapPin } from 'lucide-react'
import { CountryForm } from '@/components/admin/CountryForm'
import { CityForm } from '@/components/admin/CityForm'
import type { CitySchema, CountrySchema } from '@/types/location.schema'
import type { CountryCreateRequest, CountryUpdateRequest } from '@/types/admin.schema'
import { getErrorMessage } from '@/types/helper'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

const toCountryUpdateRequest = (
  initialData: CountrySchema,
  values: CountryCreateRequest
): CountryUpdateRequest => {
  const data: CountryUpdateRequest = {}
  const code = values.code.trim().toUpperCase()
  const name = values.name.trim()

  if (code !== initialData.code) data.code = code
  if (name !== initialData.name) data.name = name

  return data
}

const showMutationError = (error: Error, fallback: string) => {
  const message = isAxiosError(error) ? getErrorMessage(error.response?.data, fallback) : fallback

  toast.error(message)
}

export function AdminLocationsPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountrySchema | null>(null)
  const [isCountryCreateOpen, setIsCountryCreateOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<CountrySchema | null>(null)
  const [isCityCreateOpen, setIsCityCreateOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<CitySchema | null>(null)

  const { data: countries, isLoading: isCountriesLoading } = useQuery(useGetCountriesQueryOptions())

  const selectedCountryId = selectedCountry?.id ?? ''
  const { data: cities, isLoading: isCitiesLoading } = useQuery(
    useGetCitiesQueryOptions({
      countryId: selectedCountryId
    })
  )

  const createCountryMutation = useCreateCountryMutation()
  const updateCountryMutation = useUpdateCountryMutation()
  const createCityMutation = useCreateCityMutation()
  const updateCityMutation = useUpdateCityMutation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
          <p className="text-muted-foreground">Manage countries and cities.</p>
        </div>
        <Button onClick={() => setIsCountryCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Countries Column */}
        <Card>
          <CardHeader>
            <CardTitle>Countries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isCountriesLoading ? (
              <div className="text-muted-foreground py-8 text-center text-sm">
                Loading countries...
              </div>
            ) : countries?.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-sm">
                No countries found.
              </div>
            ) : (
              countries?.map((country) => (
                <div
                  key={country.id}
                  className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-2 transition-colors ${
                    selectedCountry?.id === country.id ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => setSelectedCountry(country)}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-muted rounded px-1 font-mono text-xs">{country.code}</span>
                    <span>{country.name}</span>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditingCountry(country)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Cities Column */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Cities {selectedCountry ? `in ${selectedCountry.name}` : ''}</CardTitle>
            {selectedCountry && (
              <Button size="sm" onClick={() => setIsCityCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add City
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            {!selectedCountry ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                Select a country to manage its cities.
              </div>
            ) : isCitiesLoading ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                Loading cities...
              </div>
            ) : cities?.length === 0 ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                No cities found for this country.
              </div>
            ) : (
              cities?.map((city) => (
                <div
                  key={city.id}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-3 w-3" />
                    <span>{city.name}</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => setEditingCity(city)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Forms */}
      {isCountryCreateOpen && (
        <CountryForm
          title="Add Country"
          onSubmit={(data) =>
            createCountryMutation.mutate(data, {
              onSuccess: () => {
                setIsCountryCreateOpen(false)
                toast.success('Country created')
              },
              onError: (error) => showMutationError(error, 'Failed to create country')
            })
          }
          onCancel={() => setIsCountryCreateOpen(false)}
          isLoading={createCountryMutation.isPending}
        />
      )}

      {editingCountry && (
        <CountryForm
          title="Edit Country"
          initialData={editingCountry}
          onSubmit={(values) => {
            const data = toCountryUpdateRequest(editingCountry, values)

            if (Object.keys(data).length === 0) {
              setEditingCountry(null)
              return
            }

            updateCountryMutation.mutate(
              { countryId: editingCountry.id, data },
              {
                onSuccess: (country) => {
                  setEditingCountry(null)
                  setSelectedCountry((current) => (current?.id === country.id ? country : current))
                  toast.success('Country updated')
                },
                onError: (error) => showMutationError(error, 'Failed to update country')
              }
            )
          }}
          onCancel={() => setEditingCountry(null)}
          isLoading={updateCountryMutation.isPending}
        />
      )}

      {isCityCreateOpen && selectedCountry && (
        <CityForm
          title={`Add City to ${selectedCountry.name}`}
          onSubmit={(data) => {
            if (!selectedCountry) return

            createCityMutation.mutate(
              { countryId: selectedCountry.id, data },
              {
                onSuccess: () => {
                  setIsCityCreateOpen(false)
                  toast.success('City created')
                },
                onError: (error) => showMutationError(error, 'Failed to create city')
              }
            )
          }}
          onCancel={() => setIsCityCreateOpen(false)}
          isLoading={createCityMutation.isPending}
        />
      )}

      {editingCity && (
        <CityForm
          title="Edit City"
          initialData={editingCity}
          onSubmit={(data) => {
            if (!selectedCountry) return

            updateCityMutation.mutate(
              {
                countryId: selectedCountry.id,
                cityId: editingCity.id,
                data
              },
              {
                onSuccess: () => {
                  setEditingCity(null)
                  toast.success('City updated')
                },
                onError: (error) => showMutationError(error, 'Failed to update city')
              }
            )
          }}
          onCancel={() => setEditingCity(null)}
          isLoading={updateCityMutation.isPending}
        />
      )}
    </div>
  )
}
