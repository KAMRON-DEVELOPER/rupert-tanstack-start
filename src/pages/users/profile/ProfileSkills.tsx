import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProficiencyLevel, ProficiencyLevelList } from '@/types/literals';
import { UserSchema, UserSkillLinkSchema } from '@/types/user';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useUpdateProfileMutation } from '@/services/users/auth';
import { toast } from 'sonner';

interface ProfileSkillsProps {
  user: UserSchema;
}

const ProfileSkills = ({ user }: ProfileSkillsProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('intermediate');
  const updateMutation = useUpdateProfileMutation();

  const handleAddSkill = async () => {
    if (!newSkill) return;

    const updatedSkills: UserSkillLinkSchema[] = [
      ...user.skills,
      {
        skill: { name: newSkill },
        proficiency,
      },
    ];

    try {
      await updateMutation.mutateAsync({ ...user, skills: updatedSkills });
      toast.success('Skill added');
      setNewSkill('');
      setIsAddOpen(false);
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (skillName: string) => {
    const updatedSkills = user.skills.filter((s) => s.skill.name !== skillName);
    try {
      await updateMutation.mutateAsync({ ...user, skills: updatedSkills });
      toast.success('Skill removed');
    } catch (error) {
      toast.error('Failed to remove skill');
    }
  };

  return (
    <Card className='border-none shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Skills</CardTitle>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setIsAddOpen(true)}>
          <Plus className='size-4 mr-1' />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {user.skills.length === 0 ? (
            <p className='text-sm text-muted-foreground'>No skills added yet.</p>
          ) : (
            user.skills.map((skillLink) => (
              <Badge
                key={skillLink.skill.name}
                variant='secondary'
                className='group py-1 px-3 flex items-center gap-2'>
                <span>{skillLink.skill.name}</span>
                <span className='text-[10px] opacity-60 uppercase font-bold'>{skillLink.proficiency}</span>
                <button
                  onClick={() => handleDeleteSkill(skillLink.skill.name)}
                  className='opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:text-destructive'>
                  <Trash2 className='size-3' />
                </button>
              </Badge>
            ))
          )}
        </div>
      </CardContent>

      <Dialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}>
        <DialogContent className='sm:max-w-106.25'>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>Add a new skill and specify your proficiency level.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='skill'>Skill name</Label>
              <Input
                id='skill'
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder='e.g. React, TypeScript, Rust'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='proficiency'>Proficiency</Label>
              <Select
                value={proficiency}
                onValueChange={(value) => setProficiency(value as ProficiencyLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select proficiency' />
                </SelectTrigger>
                <SelectContent>
                  {ProficiencyLevelList.map((level) => (
                    <SelectItem
                      key={level}
                      value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddSkill}
              disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Adding...' : 'Add Skill'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProfileSkills;
