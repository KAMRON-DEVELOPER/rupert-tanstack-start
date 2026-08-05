import { getRouteApi } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetCompaniesQueryOptions } from '@/api/companies/companies'
import CompanyCard from './CompanyCard'
import EmptyState from '@/components/forms/EmptyState'

const CompanyList = () => {
  const search = getRouteApi('/(apps)/(work)/work/companies/').useSearch()
  const {
    data: { data: companies, total }
  } = useSuspenseQuery(useGetCompaniesQueryOptions(search))

  return (
    <div className="col-span-2 space-y-2 rounded-lg border border-dashed p-4">
      <p>Total companies: {total}</p>

      <div className="space-y-2">
        {companies.length === 0 ? (
          <EmptyState title="No companies found" />
        ) : (
          companies.map((c) => <CompanyCard key={c.id} c={c} />)
        )}
      </div>
    </div>
  )
}

export default CompanyList
