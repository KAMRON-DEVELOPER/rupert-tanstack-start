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
import { useCreateCompanyMutation, useUpdateCompanyMutation } from '@/api/companies/companies'
import { getErrorMessage } from '@/types/shared/helper'
import { CompanyTypeList, type CompanyType } from '@/types/shared/literals'
import type {
  CompanyCreateRequest,
  CompanySchema,
  CompanyUpdateRequest
} from '@/types/companies/company'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

interface CompanyFormProps {
  company?: CompanySchema
  open: boolean
  onOpenChange: (open: boolean) => void
}

type CompanyFormState = CompanyCreateRequest

const emptyToNull = (value: string) => {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

const CompanyForm = ({ company, open, onOpenChange }: CompanyFormProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const createMutation = useCreateCompanyMutation(api)
  const updateMutation = useUpdateCompanyMutation(api)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<CompanyFormState>({
    name: company?.name ?? '',
    tagline: company?.tagline ?? '',
    description: company?.description ?? '',
    logoUrl: company?.logoUrl ?? '',
    websiteUrl: company?.websiteUrl ?? '',
    type: company?.type ?? 'startup',
    countryId: company?.country.id ?? '',
    cityId: company?.city?.id ?? '',
    contactEmail: company?.contactEmail ?? '',
    contactPhone: company?.contactPhone ?? ''
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const updateField = <K extends keyof CompanyFormState>(key: K, value: CompanyFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const payload: CompanyCreateRequest = {
      ...form,
      name: form.name.trim(),
      countryId: form.countryId.trim(),
      cityId: emptyToNull(form.cityId ?? ''),
      tagline: emptyToNull(form.tagline ?? ''),
      description: emptyToNull(form.description ?? ''),
      logoUrl: emptyToNull(form.logoUrl ?? ''),
      websiteUrl: emptyToNull(form.websiteUrl ?? ''),
      contactEmail: emptyToNull(form.contactEmail ?? ''),
      contactPhone: emptyToNull(form.contactPhone ?? '')
    }

    try {
      if (company) {
        await updateMutation.mutateAsync({
          id: company.id,
          data: payload satisfies CompanyUpdateRequest
        })
        toast.success('Company updated')
      } else {
        await createMutation.mutateAsync(payload)
        toast.success('Company created')
      }

      onOpenChange(false)
    } catch (err) {
      const message = isAxiosError(err)
        ? getErrorMessage(err.response?.data, 'Company save failed')
        : 'Company save failed'
      setError(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-131.25">
        <DialogHeader>
          <DialogTitle>{company ? 'Edit Company' : 'Create Company'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Name</Label>
              <Input
                id="company-name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(value) => updateField('type', value as CompanyType)}
              >
                <SelectTrigger id="company-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CompanyTypeList.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-country">Country ID</Label>
              <Input
                id="company-country"
                value={form.countryId}
                onChange={(event) => updateField('countryId', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-city">City ID</Label>
              <Input
                id="company-city"
                value={form.cityId ?? ''}
                onChange={(event) => updateField('cityId', event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="company-tagline">Tagline</Label>
              <Input
                id="company-tagline"
                value={form.tagline ?? ''}
                onChange={(event) => updateField('tagline', event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="company-description">Description</Label>
              <Textarea
                id="company-description"
                value={form.description ?? ''}
                onChange={(event) => updateField('description', event.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Website</Label>
              <Input
                id="company-website"
                value={form.websiteUrl ?? ''}
                onChange={(event) => updateField('websiteUrl', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-logo">Logo URL</Label>
              <Input
                id="company-logo"
                value={form.logoUrl ?? ''}
                onChange={(event) => updateField('logoUrl', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Contact email</Label>
              <Input
                id="company-email"
                type="email"
                value={form.contactEmail ?? ''}
                onChange={(event) => updateField('contactEmail', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Contact phone</Label>
              <Input
                id="company-phone"
                value={form.contactPhone ?? ''}
                onChange={(event) => updateField('contactPhone', event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton isPending={isPending}>
              {company ? 'Save changes' : 'Create company'}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CompanyForm
