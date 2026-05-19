import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CompanyForm from './CompanyForm'

const CompanyRightSidebar = () => {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            Create company
          </Button>
        </CardContent>
      </Card>
      <CompanyForm open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}

export default CompanyRightSidebar
