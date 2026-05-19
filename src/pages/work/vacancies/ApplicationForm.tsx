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
import { useGetResumesQueryOptions } from '@/services/users/users'
import { useCreateApplicationMutation } from '@/services/vacancies/vacancies'
import { getErrorMessage } from '@/types/helper'
import type { VacancySchema } from '@/types/vacancy'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const ApplicationForm = ({ vacancy }: { vacancy: VacancySchema }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const { data: resumes } = useSuspenseQuery(useGetResumesQueryOptions())
  const createApplication = useCreateApplicationMutation(api)
  const [resumeId, setResumeId] = useState('none')
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await createApplication.mutateAsync({
        vacancyId: vacancy.id,
        resumeId: resumeId === 'none' ? null : resumeId,
        coverLetter: coverLetter.trim() || null
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
                  {resumes.map((resume) => (
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
            <SubmitButton isPending={createApplication.isPending}>Submit application</SubmitButton>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default ApplicationForm
