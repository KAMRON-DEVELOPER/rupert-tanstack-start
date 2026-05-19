import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Specialization, SpecializationList } from '@/types/literals'
import { ResumeSchema, UserSchema } from '@/types/user'
import { FileText, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useUpdateProfileMutation } from '@/services/users/auth'
import { toast } from 'sonner'

interface ProfileResumesProps {
  user: UserSchema
}

const ProfileResumes = ({ user }: ProfileResumesProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newResume, setNewResume] = useState<Partial<ResumeSchema>>({
    title: '',
    specialization: 'fullstack',
    country: user.country || '',
    city: user.city || ''
  })
  const updateMutation = useUpdateProfileMutation()

  const handleAddResume = async () => {
    if (!newResume.title || !newResume.specialization) return

    const resumeToAdd = {
      ...newResume,
      userId: (user as any).id || '', // Assuming id is available or handled by backend
      skills: []
    } as ResumeSchema

    const updatedResumes = [...user.resumes, resumeToAdd]

    try {
      await updateMutation.mutateAsync({ ...user, resumes: updatedResumes })
      toast.success('Resume added')
      setIsAddOpen(false)
      setNewResume({
        title: '',
        specialization: 'fullstack',
        country: user.country || '',
        city: user.city || ''
      })
    } catch (error) {
      toast.error('Failed to add resume')
    }
  }

  const handleDeleteResume = async (index: number) => {
    const updatedResumes = user.resumes.filter((_, i) => i !== index)
    try {
      await updateMutation.mutateAsync({ ...user, resumes: updatedResumes })
      toast.success('Resume removed')
    } catch (error) {
      toast.error('Failed to remove resume')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Resumes</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-1 size-4" />
          Add Resume
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user.resumes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No resumes added yet.</p>
          ) : (
            user.resumes.map((resume, index) => (
              <div
                key={index}
                className="group hover:border-primary flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <FileText className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{resume.title}</h4>
                    <p className="text-muted-foreground text-xs">
                      {resume.specialization} • {resume.city}, {resume.country}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDeleteResume(index)}
                  className="text-muted-foreground hover:text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add Resume</DialogTitle>
            <DialogDescription>
              Create a new resume profile. You can add more details later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                value={newResume.title}
                onChange={(e) => setNewResume((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={newResume.specialization}
                onValueChange={(value) =>
                  setNewResume((prev) => ({
                    ...prev,
                    specialization: value as Specialization
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SpecializationList.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec.replace(/_/g, ' ').charAt(0).toUpperCase() +
                        spec.replace(/_/g, ' ').slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resume-country">Country</Label>
                <Input
                  id="resume-country"
                  value={newResume.country}
                  onChange={(e) => setNewResume((prev) => ({ ...prev, country: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume-city">City</Label>
                <Input
                  id="resume-city"
                  value={newResume.city}
                  onChange={(e) => setNewResume((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddResume} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Adding...' : 'Add Resume'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ProfileResumes
