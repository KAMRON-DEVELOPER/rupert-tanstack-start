import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import type { CountryCreateRequest } from '@/types/admin/admin.schema'

type CountryFormProps = {
  initialData?: { code: string; name: string }
  onSubmit: (data: CountryCreateRequest) => void
  onCancel: () => void
  isLoading?: boolean
  title: string
}

export function CountryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  title
}: CountryFormProps) {
  const [code, setCode] = useState(initialData?.code || '')
  const [name, setName] = useState(initialData?.name || '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ code: code.trim().toUpperCase(), name: name.trim() })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Country Code (2 letters)</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. US, UZ"
              maxLength={2}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Country Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. United States, Uzbekistan"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
