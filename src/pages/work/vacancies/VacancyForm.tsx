import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateVacancyMutation, useUpdateVacancyMutation } from '@/api/vacancies/vacancies'
import { useGetCountriesQueryOptions, useGetCitiesQueryOptions } from '@/api/locations/locations'
import { getErrorMessage } from '@/types/shared/helper'
import {
  EmploymentTypeList,
  PaymentFrequencyList,
  SalaryCurrencyList,
  SpecializationList,
  SubmissionTypeList,
  VacancyStatusList,
  WorkFormatList,
  type EmploymentType,
  type PaymentFrequency,
  type SalaryCurrency,
  type Specialization,
  type SubmissionType,
  type VacancyStatus,
  type WorkFormat
} from '@/types/shared/literals'
import type { VacancyCreateRequest, VacancyDetailResponse } from '@/types/vacancies/vacancy'
import { useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

interface VacancyFormProps {
  vacancy?: VacancyDetailResponse
  companyId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

type NullableCurrency = SalaryCurrency | 'none'
type NullableFrequency = PaymentFrequency | 'none'

const toOptionalString = (value: string) => {
  const trimmed = value.trim()
  return trimmed ? trimmed : undefined
}

const toOptionalNumber = (value: string) => {
  if (!value.trim()) return undefined
  return Number(value)
}

const VacancyForm = ({
  vacancy,
  companyId: companyIdProp,
  open,
  onOpenChange
}: VacancyFormProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const createVacancy = useCreateVacancyMutation(api)
  const updateVacancy = useUpdateVacancyMutation(api)
  const [error, setError] = useState<string | null>(null)
  const [companyId, setCompanyId] = useState(vacancy?.company.id ?? companyIdProp ?? '')
  const [title, setTitle] = useState(vacancy?.title ?? '')
  const [description, setDescription] = useState(vacancy?.description ?? '')
  const [countryId, setCountryId] = useState(vacancy?.country.id ?? '')
  const [cityId, setCityId] = useState(vacancy?.city?.id ?? '')
  const [externalApplyUrl, setExternalApplyUrl] = useState(vacancy?.externalApplyUrl ?? '')
  const [submissionType, setSubmissionType] = useState<SubmissionType>(
    vacancy?.submissionType ?? 'profile'
  )
  const [specialization, setSpecialization] = useState<Specialization>(
    vacancy?.specialization ?? 'fullstack'
  )
  const [salaryMin, setSalaryMin] = useState(vacancy?.salaryMin?.toString() ?? '')
  const [salaryMax, setSalaryMax] = useState(vacancy?.salaryMax?.toString() ?? '')
  const [salaryCurrency, setSalaryCurrency] = useState<NullableCurrency>(
    vacancy?.salaryCurrency ?? 'none'
  )
  const [paymentFrequency, setPaymentFrequency] = useState<NullableFrequency>(
    vacancy?.paymentFrequency ?? 'none'
  )
  const [yearsOfExperienceMin, setYearsOfExperienceMin] = useState(
    vacancy?.yearsOfExperienceMin?.toString() ?? ''
  )
  const [workFormat, setWorkFormat] = useState<WorkFormat>(vacancy?.workFormat ?? 'remote')
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState(
    vacancy?.workHoursPerWeek?.toString() ?? ''
  )
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    vacancy?.employmentType ?? 'full_time'
  )
  const [status, setStatus] = useState<VacancyStatus>(vacancy?.status ?? 'open')

  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(useGetCitiesQueryOptions({ countryId }))

  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []

  const isPending = createVacancy.isPending || updateVacancy.isPending

  const handleCountryChange = (value: string) => {
    setCountryId(value)
    setCityId('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const payload: VacancyCreateRequest = {
      title: title.trim(),
      description: description.trim(),
      countryId: countryId.trim(),
      cityId: toOptionalString(cityId),
      externalApplyUrl: toOptionalString(externalApplyUrl),
      submissionType,
      specialization,
      salaryMin: toOptionalNumber(salaryMin),
      salaryMax: toOptionalNumber(salaryMax),
      salaryCurrency: salaryCurrency === 'none' ? undefined : salaryCurrency,
      paymentFrequency: paymentFrequency === 'none' ? undefined : paymentFrequency,
      yearsOfExperienceMin: toOptionalNumber(yearsOfExperienceMin),
      workFormat,
      workHoursPerWeek: toOptionalNumber(workHoursPerWeek),
      employmentType,
      status
    }

    try {
      if (vacancy) {
        await updateVacancy.mutateAsync({ id: vacancy.id, data: payload })
        toast.success('Vacancy updated')
      } else {
        await createVacancy.mutateAsync({
          companyId: companyId.trim(),
          data: payload
        })
        toast.success('Vacancy created')
      }
      onOpenChange(false)
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Vacancy save failed')
          : 'Vacancy save failed'
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{vacancy ? 'Edit Vacancy' : 'Create Vacancy'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-2">
            {!vacancy && !companyIdProp && (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="vacancy-company">Company ID</Label>
                <Input
                  id="vacancy-company"
                  value={companyId}
                  onChange={(event) => setCompanyId(event.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vacancy-title">Title</Label>
              <Input
                id="vacancy-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vacancy-description">Description</Label>
              <Textarea
                id="vacancy-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={countryId} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Select value={cityId} onValueChange={setCityId} disabled={!countryId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={countryId ? 'Select city' : 'Select a country first'} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SelectField
              label="Submission"
              value={submissionType}
              values={SubmissionTypeList}
              onValueChange={(value) => setSubmissionType(value as SubmissionType)}
            />
            <SelectField
              label="Specialization"
              value={specialization}
              values={SpecializationList}
              onValueChange={(value) => setSpecialization(value as Specialization)}
            />
            <SelectField
              label="Work format"
              value={workFormat}
              values={WorkFormatList}
              onValueChange={(value) => setWorkFormat(value as WorkFormat)}
            />
            <SelectField
              label="Employment"
              value={employmentType}
              values={EmploymentTypeList}
              onValueChange={(value) => setEmploymentType(value as EmploymentType)}
            />
            <SelectField
              label="Status"
              value={status}
              values={VacancyStatusList}
              onValueChange={(value) => setStatus(value as VacancyStatus)}
            />
            <SelectField
              label="Salary currency"
              value={salaryCurrency}
              values={['none', ...SalaryCurrencyList]}
              onValueChange={(value) => setSalaryCurrency(value as NullableCurrency)}
            />
            <SelectField
              label="Payment frequency"
              value={paymentFrequency}
              values={['none', ...PaymentFrequencyList]}
              onValueChange={(value) => setPaymentFrequency(value as NullableFrequency)}
            />
            <NumberField label="Salary min" value={salaryMin} onChange={setSalaryMin} />
            <NumberField label="Salary max" value={salaryMax} onChange={setSalaryMax} />
            <NumberField
              label="Min experience"
              value={yearsOfExperienceMin}
              onChange={setYearsOfExperienceMin}
            />
            <NumberField
              label="Hours/week"
              value={workHoursPerWeek}
              onChange={setWorkHoursPerWeek}
            />
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vacancy-external-url">External apply URL</Label>
              <Input
                id="vacancy-external-url"
                value={externalApplyUrl}
                onChange={(event) => setExternalApplyUrl(event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton isPending={isPending}>
              {vacancy ? 'Save changes' : 'Create vacancy'}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface SelectFieldProps<TValue extends string> {
  label: string
  value: TValue
  values: readonly TValue[]
  onValueChange: (value: string) => void
}

const SelectField = <TValue extends string>({
  label,
  value,
  values,
  onValueChange
}: SelectFieldProps<TValue>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {values.map((item) => (
          <SelectItem key={item} value={item}>
            {item.replace(/_/g, ' ')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

const NumberField = ({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input type="number" min="0" value={value} onChange={(event) => onChange(event.target.value)} />
  </div>
)

export default VacancyForm
