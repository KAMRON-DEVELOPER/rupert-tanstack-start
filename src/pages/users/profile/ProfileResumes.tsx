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
import {
  ProficiencyLevel,
  ProficiencyLevelList,
  Specialization,
  SpecializationList
} from '@/types/literals'
import type { ResumeRequest, UserSchema } from '@/types/user'
import { FileText, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useAddResumeSkillMutation,
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useDeleteResumeSkillMutation,
  useGetResumesQueryOptions,
  useUpdateResumeSkillMutation,
  useUpdateResumeMutation
} from '@/services/users/users'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

interface ProfileResumesProps {
  user: UserSchema
}

const ProfileResumes = ({ user }: ProfileResumesProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null)
  const [skillResumeId, setSkillResumeId] = useState<string | null>(null)
  const [skillId, setSkillId] = useState('')
  const [skillProficiency, setSkillProficiency] = useState<ProficiencyLevel>('intermediate')
  const [newResume, setNewResume] = useState<Partial<ResumeRequest>>({
    title: '',
    specialization: 'fullstack',
    country: user.country || '',
    city: user.city || ''
  })
  const createResumeMutation = useCreateResumeMutation()
  const updateResumeMutation = useUpdateResumeMutation()
  const deleteResumeMutation = useDeleteResumeMutation()
  const addResumeSkillMutation = useAddResumeSkillMutation()
  const updateResumeSkillMutation = useUpdateResumeSkillMutation()
  const deleteResumeSkillMutation = useDeleteResumeSkillMutation()
  const { data: resumesData } = useQuery(useGetResumesQueryOptions())
  const resumes = resumesData ?? user.resumes
  const editingResume = resumes.find((resume) => resume.id === editingResumeId)

  const handleAddResume = async () => {
    if (!newResume.title || !newResume.specialization) return

    const resumeToAdd: ResumeRequest = {
      title: newResume.title,
      specialization: newResume.specialization,
      country: newResume.country || '',
      city: newResume.city || '',
      skills: []
    }

    try {
      await createResumeMutation.mutateAsync(resumeToAdd)
      toast.success('Resume added')
      setIsAddOpen(false)
      setNewResume({
        title: '',
        specialization: 'fullstack',
        country: user.country || '',
        city: user.city || ''
      })
    } catch {
      toast.error('Failed to add resume')
    }
  }

  const handleDeleteResume = async (resumeId: string) => {
    try {
      await deleteResumeMutation.mutateAsync(resumeId)
      toast.success('Resume removed')
    } catch {
      toast.error('Failed to remove resume')
    }
  }

  const handleUpdateResume = async () => {
    if (!editingResumeId || !newResume.title || !newResume.specialization) return

    try {
      await updateResumeMutation.mutateAsync({
        resumeId: editingResumeId,
        data: {
          title: newResume.title,
          summary: newResume.summary ?? null,
          specialization: newResume.specialization,
          country: newResume.country || '',
          city: newResume.city || ''
        }
      })
      toast.success('Resume updated')
      setEditingResumeId(null)
      setIsAddOpen(false)
    } catch {
      toast.error('Failed to update resume')
    }
  }

  const openEdit = (resume: (typeof resumes)[number]) => {
    setEditingResumeId(resume.id)
    setNewResume({
      title: resume.title,
      summary: resume.summary ?? '',
      specialization: resume.specialization,
      country: resume.country,
      city: resume.city
    })
    setIsAddOpen(true)
  }

  const openCreate = () => {
    setEditingResumeId(null)
    setNewResume({
      title: '',
      specialization: 'fullstack',
      country: user.country || '',
      city: user.city || ''
    })
    setIsAddOpen(true)
  }

  const handleAddResumeSkill = async () => {
    if (!skillResumeId || !skillId) return

    try {
      await addResumeSkillMutation.mutateAsync({
        resumeId: skillResumeId,
        data: {
          skillId: skillId.trim(),
          proficiency: skillProficiency,
          lastUsedAt: null
        }
      })
      setSkillResumeId(null)
      setSkillId('')
      setSkillProficiency('intermediate')
      toast.success('Resume skill added')
    } catch {
      toast.error('Failed to add resume skill')
    }
  }

  const handleUpdateResumeSkill = async (
    resumeId: string,
    skillLinkId: string,
    proficiency: ProficiencyLevel
  ) => {
    try {
      await updateResumeSkillMutation.mutateAsync({
        resumeId,
        skillLinkId,
        data: { proficiency }
      })
      toast.success('Resume skill updated')
    } catch {
      toast.error('Failed to update resume skill')
    }
  }

  const handleDeleteResumeSkill = async (resumeId: string, skillLinkId: string) => {
    try {
      await deleteResumeSkillMutation.mutateAsync({ resumeId, skillLinkId })
      toast.success('Resume skill removed')
    } catch {
      toast.error('Failed to remove resume skill')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Resumes</CardTitle>
        <Button variant="ghost" size="sm" onClick={openCreate}>
          <Plus className="mr-1 size-4" />
          Add Resume
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resumes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No resumes added yet.</p>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
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
                    {resume.skills && resume.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {resume.skills.map((skillLink) => (
                          <div
                            key={skillLink.id}
                            className="flex items-center gap-1 rounded-md border px-2 py-1"
                          >
                            <span className="text-xs">{skillLink.skill.name}</span>
                            <Select
                              value={skillLink.proficiency}
                              onValueChange={(value) =>
                                handleUpdateResumeSkill(
                                  resume.id,
                                  skillLink.id,
                                  value as ProficiencyLevel
                                )
                              }
                            >
                              <SelectTrigger className="h-6 w-28 border-0 px-1 text-xs shadow-none">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ProficiencyLevelList.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <button
                              type="button"
                              onClick={() => handleDeleteResumeSkill(resume.id, skillLink.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSkillResumeId(resume.id)}>
                    <Plus className="size-4" />
                    Skill
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(resume)}
                    className="text-muted-foreground"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDeleteResume(resume.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{editingResume ? 'Edit Resume' : 'Add Resume'}</DialogTitle>
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
              <Label htmlFor="summary">Summary</Label>
              <Input
                id="summary"
                value={newResume.summary ?? ''}
                onChange={(e) => setNewResume((prev) => ({ ...prev, summary: e.target.value }))}
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
            <Button
              onClick={editingResume ? handleUpdateResume : handleAddResume}
              disabled={createResumeMutation.isPending || updateResumeMutation.isPending}
            >
              {editingResume
                ? updateResumeMutation.isPending
                  ? 'Saving...'
                  : 'Save Resume'
                : createResumeMutation.isPending
                  ? 'Adding...'
                  : 'Add Resume'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(skillResumeId)} onOpenChange={() => setSkillResumeId(null)}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add Resume Skill</DialogTitle>
            <DialogDescription>Add an existing skill to this resume.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resume-skill-id">Skill ID</Label>
              <Input
                id="resume-skill-id"
                value={skillId}
                onChange={(event) => setSkillId(event.target.value)}
                placeholder="Existing skill UUID"
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Select
                value={skillProficiency}
                onValueChange={(value) => setSkillProficiency(value as ProficiencyLevel)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ProficiencyLevelList.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddResumeSkill} disabled={addResumeSkillMutation.isPending}>
              {addResumeSkillMutation.isPending ? 'Adding...' : 'Add Skill'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ProfileResumes
