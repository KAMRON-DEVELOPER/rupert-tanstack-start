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
import { useCreateVacancyMutation, useUpdateVacancyMutation } from '@/services/vacancies/vacancies'
import { getErrorMessage } from '@/types/helper'
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
} from '@/types/literals'
import type { VacancyRequest, VacancySchema } from '@/types/vacancy'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

interface VacancyFormProps {
  vacancy?: VacancySchema
  open: boolean
  onOpenChange: (open: boolean) => void
}

type NullableCurrency = SalaryCurrency | 'none'
type NullableFrequency = PaymentFrequency | 'none'

const toOptionalString = (value: string) => {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

const toOptionalNumber = (value: string) => {
  if (!value.trim()) return null
  return Number(value)
}

const VacancyForm = ({ vacancy, open, onOpenChange }: VacancyFormProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const createVacancy = useCreateVacancyMutation(api)
  const updateVacancy = useUpdateVacancyMutation(api)
  const [error, setError] = useState<string | null>(null)
  const [companyId, setCompanyId] = useState(vacancy?.company.id ?? '')
  const [title, setTitle] = useState(vacancy?.title ?? '')
  const [description, setDescription] = useState(vacancy?.description ?? '')
  const [country, setCountry] = useState(vacancy?.country ?? '')
  const [city, setCity] = useState(vacancy?.city ?? '')
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

  const isPending = createVacancy.isPending || updateVacancy.isPending

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const payload: VacancyRequest = {
      title: title.trim(),
      description: description.trim(),
      country: country.trim(),
      city: city.trim(),
      externalApplyUrl: toOptionalString(externalApplyUrl),
      submissionType,
      specialization,
      salaryMin: toOptionalNumber(salaryMin),
      salaryMax: toOptionalNumber(salaryMax),
      salaryCurrency: salaryCurrency === 'none' ? null : salaryCurrency,
      paymentFrequency: paymentFrequency === 'none' ? null : paymentFrequency,
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
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{vacancy ? 'Edit Vacancy' : 'Create Vacancy'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-2">
            {!vacancy && (
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
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vacancy-country">Country</Label>
              <Input
                id="vacancy-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vacancy-city">City</Label>
              <Input
                id="vacancy-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
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
