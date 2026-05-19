import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import VacancyForm from './VacancyForm'

const VacancyRightSidebar = () => {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Vacancies</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            Create vacancy
          </Button>
        </CardContent>
      </Card>
      <VacancyForm open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}

export default VacancyRightSidebar
