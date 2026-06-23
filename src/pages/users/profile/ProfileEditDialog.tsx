import { useMemo, useState } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'

import { useUpdateProfileMutation } from '@/api/users/users'
import { useGetCountriesQueryOptions, useGetCitiesQueryOptions } from '@/api/locations/locations'
import { SingleCombobox } from '@/components/combobox'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserDetailResponse, UserUpdateRequest } from '@/types/users/user'
import { toast } from 'sonner'

type ProfileEditForm = Pick<
  UserUpdateRequest,
  | 'firstName'
  | 'lastName'
  | 'headline'
  | 'birthdate'
  | 'bio'
  | 'specialization'
  | 'phoneNumber'
  | 'githubUrl'
  | 'telegramUsername'
  | 'followPolicy'
  | 'jobSearchStatus'
> & {
  countryId: string
  cityId: string
}

interface ProfileEditDialogProps {
  user: UserDetailResponse
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ProfileEditDialog = ({ user, open, onOpenChange }: ProfileEditDialogProps) => {
  const [formData, setFormData] = useState<ProfileEditForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    headline: user.headline,
    birthdate: user.birthdate,
    bio: user.bio,
    specialization: user.specialization,
    phoneNumber: user.phoneNumber,
    githubUrl: user.githubUrl,
    telegramUsername: user.telegramUsername,
    followPolicy: user.followPolicy,
    jobSearchStatus: user.jobSearchStatus,
    countryId: user.country?.id ?? '',
    cityId: user.city?.id ?? ''
  })
  const updateMutation = useUpdateProfileMutation()

  const { data: countriesData } = useSuspenseQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(useGetCitiesQueryOptions({ countryId: formData.countryId }))

  const countryOptions = useMemo(
    () => countriesData.data.map((c) => ({ value: c.id, label: c.name })),
    [countriesData]
  )
  const cityOptions = useMemo(
    () => (citiesData?.data ?? []).map((c) => ({ value: c.id, label: c.name })),
    [citiesData]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload: UserUpdateRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.headline,
        birthdate: formData.birthdate,
        bio: formData.bio,
        specialization: formData.specialization,
        phoneNumber: formData.phoneNumber,
        githubUrl: formData.githubUrl,
        telegramUsername: formData.telegramUsername,
        followPolicy: formData.followPolicy,
        jobSearchStatus: formData.jobSearchStatus,
        countryId: formData.countryId || undefined,
        cityId: formData.cityId || undefined
      }

      await updateMutation.mutateAsync(payload)
      toast.success('Profile updated successfully')
      onOpenChange(false)
    } catch {
      toast.error('Failed to update profile')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-131.25">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              name="headline"
              value={formData.headline || ''}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countryId">Country</Label>
              <SingleCombobox
                id="countryId"
                options={countryOptions}
                value={formData.countryId}
                placeholder="Select country"
                emptyLabel="No countries found"
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, countryId: val ?? '', cityId: '' }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cityId">City</Label>
              <SingleCombobox
                id="cityId"
                options={cityOptions}
                value={formData.cityId}
                placeholder={formData.countryId ? 'Select city' : 'Select a country first'}
                emptyLabel="No cities found"
                disabled={!formData.countryId}
                onChange={(val) => setFormData((prev) => ({ ...prev, cityId: val ?? '' }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileEditDialog
