import { BarChart3 } from 'lucide-react'

const VacancyRightSidebar = () => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-4 text-center">
      <BarChart3 className="text-muted-foreground size-8" />
      <h3 className="text-sm font-semibold">Insights</h3>
      <p className="text-muted-foreground text-xs">Vacancy insights will appear here.</p>
    </div>
  )
}

export default VacancyRightSidebar
