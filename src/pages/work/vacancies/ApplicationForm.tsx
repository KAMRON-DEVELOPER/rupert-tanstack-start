import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateApplicationMutation } from '@/api/vacancies/vacancies'
import { useGetResumesQueryOptions } from '@/api/users/resume'
import { getErrorMessage } from '@/types/shared/helper'
import type { VacancyDetailResponse } from '@/types/vacancies/vacancy'
import { useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState, type SubmitEvent } from 'react'
import { toast } from 'sonner'

const ApplicationForm = ({ vacancy }: { vacancy: VacancyDetailResponse }) => {
  const { api, isAuthenticated } = useRouteContext({ from: '__root__' })
  const { data: resumesData, isPending: resumesPending } = useQuery({
    ...useGetResumesQueryOptions(),
    enabled: isAuthenticated
  })
  const createApplication = useCreateApplicationMutation(api)
  const [resumeId, setResumeId] = useState('none')
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isAuthenticated) return null
  if (isAuthenticated && vacancy.permission.isOwner) return null

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await createApplication.mutateAsync({
        vacancyId: vacancy.id,
        resumeId: resumeId === 'none' ? undefined : resumeId,
        coverLetter: coverLetter.trim() || undefined
      })
      toast.success('Application submitted')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to submit application')
          : 'Failed to submit application'
      )
    }
  }

  if (resumesPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Apply</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Loading resumes...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply</CardTitle>
      </CardHeader>
      <CardContent>
        {vacancy.hasApplied ? (
          <p className="text-muted-foreground text-sm">You have already applied to this vacancy.</p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <FormError message={error} />
            <div className="space-y-2">
              <Label>Resume</Label>
              <Select value={resumeId} onValueChange={setResumeId}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No resume</SelectItem>
                  {resumesData?.data?.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      {resume.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover letter</Label>
              <Textarea
                id="cover-letter"
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                rows={4}
              />
            </div>
            <SubmitButton isPending={createApplication.isPending || resumesPending}>
              Submit application
            </SubmitButton>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default ApplicationForm
