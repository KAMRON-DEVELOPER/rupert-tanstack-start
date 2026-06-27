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
} from '@/api/companies/companies'
import { useSearchUsersQueryOptions } from '@/api/users/users'
import type { CompanyDetailResponse } from '@/types/companies/company'
import { getErrorMessage } from '@/types/shared/helper'
import { CompanyMemberRoleList, type CompanyMemberRole } from '@/types/shared/literals'
import { useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { Search, Trash2, X } from 'lucide-react'
import { useState, useDeferredValue, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const CompanyMembers = ({ company }: { company: CompanyDetailResponse }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addMember = useAddCompanyMemberMutation(api)
  const updateMember = useUpdateCompanyMemberMutation(api)
  const deleteMember = useDeleteCompanyMemberMutation(api)
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null)
  const [role, setRole] = useState<CompanyMemberRole>('member')
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDeferredValue(search)
  const isSearching = debouncedSearch.trim().length > 0

  const { data: searchResults } = useQuery({
    ...useSearchUsersQueryOptions({ q: debouncedSearch.trim(), offset: 0, limit: 10 }),
    enabled: isSearching && !selectedUserId
  })

  const users = searchResults?.data ?? []

  const selectUser = (userId: string, name: string) => {
    setSelectedUserId(userId)
    setSelectedUserName(name)
    setSearch('')
  }

  const clearSelection = () => {
    setSelectedUserId(null)
    setSelectedUserName(null)
  }

  const submitMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedUserId) return
    setError(null)

    try {
      await addMember.mutateAsync({
        companyId: company.id,
        data: { userId: selectedUserId, role }
      })
      clearSelection()
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
          <div className="space-y-2">
            <Label>User</Label>
            {selectedUserId ? (
              <div className="flex items-center gap-2 rounded-md border p-2">
                <span className="flex-1 text-sm">{selectedUserName ?? selectedUserId}</span>
                <Button type="button" variant="ghost" size="icon-xs" onClick={clearSelection}>
                  <X className="size-3" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users by name..."
                  className="pl-9"
                />
              </div>
            )}
          </div>

          {!selectedUserId && isSearching && users.length > 0 && (
            <div className="space-y-1 rounded-md border">
              {users.map((user) => {
                const initials =
                  (user.firstName?.charAt(0) ?? '') + (user.lastName?.charAt(0) ?? '')
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => selectUser(user.id, user.name)}
                    className="hover:bg-accent flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors"
                  >
                    <Avatar className="size-7">
                      <AvatarImage src={user.avatarUrl ?? undefined} />
                      <AvatarFallback className="text-xs">{initials.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex items-end gap-2">
            <div className="w-36">
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
            <SubmitButton isPending={addMember.isPending} disabled={!selectedUserId}>
              Add
            </SubmitButton>
          </div>
        </form>

        {company.members.length === 0 ? (
          <EmptyState title="No members" description="Search and add a member above." />
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
