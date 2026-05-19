import EmptyState from '@/components/forms/EmptyState'
import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  useAddCompanyMemberMutation,
  useDeleteCompanyMemberMutation,
  useUpdateCompanyMemberMutation
} from '@/services/companies/companies'
import type { CompanySchema } from '@/types/company'
import { getErrorMessage } from '@/types/helper'
import { CompanyMemberRoleList, type CompanyMemberRole } from '@/types/literals'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const CompanyMembers = ({ company }: { company: CompanySchema }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addMember = useAddCompanyMemberMutation(api)
  const updateMember = useUpdateCompanyMemberMutation(api)
  const deleteMember = useDeleteCompanyMemberMutation(api)
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState<CompanyMemberRole>('member')
  const [error, setError] = useState<string | null>(null)

  const submitMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await addMember.mutateAsync({
        companyId: company.id,
        data: { userId: userId.trim(), role }
      })
      setUserId('')
      setRole('member')
      toast.success('Member added')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to add member')
          : 'Failed to add member'
      )
    }
  }

  const changeRole = async (memberId: string, nextRole: CompanyMemberRole) => {
    try {
      await updateMember.mutateAsync({
        companyId: company.id,
        memberId,
        data: { role: nextRole }
      })
      toast.success('Member role updated')
    } catch {
      toast.error('Failed to update member role')
    }
  }

  const removeMember = async (memberId: string) => {
    try {
      await deleteMember.mutateAsync({ companyId: company.id, memberId })
      toast.success('Member removed')
    } catch {
      toast.error('Failed to remove member')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={submitMember} className="space-y-3 rounded-lg border p-3">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-[1fr_160px_auto]">
            <div className="space-y-2">
              <Label htmlFor="company-member-user">User ID</Label>
              <Input
                id="company-member-user"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="Existing user UUID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as CompanyMemberRole)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CompanyMemberRoleList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <SubmitButton isPending={addMember.isPending}>Add</SubmitButton>
            </div>
          </div>
        </form>

        {company.members.length === 0 ? (
          <EmptyState title="No members" description="Add a member by user ID." />
        ) : (
          <div className="space-y-2">
            {company.members.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    {member.user.firstName} {member.user.lastName}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.user.headline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={member.role}
                    onValueChange={(value) => changeRole(member.id, value as CompanyMemberRole)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CompanyMemberRoleList.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeMember(member.id)}
                    disabled={deleteMember.isPending}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CompanyMembers
