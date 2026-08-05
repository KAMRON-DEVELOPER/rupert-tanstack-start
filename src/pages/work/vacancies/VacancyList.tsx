import { getRouteApi } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetVacanciesQueryOptions } from '@/api/vacancies/vacancies'
import VacancyCard from './VacancyCard'
import EmptyState from '@/components/forms/EmptyState'

const VacancyList = () => {
  const search = getRouteApi('/(apps)/(work)/work/vacancies/').useSearch()
  const {
    data: { data: vacancies, total }
  } = useSuspenseQuery(useGetVacanciesQueryOptions(search))

  return (
    <div className="col-span-2 flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        {total} {total === 1 ? 'vacancy' : 'vacancies'} found
      </p>

      <div className="flex flex-col gap-4">
        {vacancies.length === 0 ? (
          <EmptyState
            title="No vacancies found"
            description="Try adjusting your filters or resetting them to see more results."
          />
        ) : (
          vacancies.map((v) => <VacancyCard key={v.id} v={v} />)
        )}
      </div>
    </div>
  )
}

export default VacancyList
