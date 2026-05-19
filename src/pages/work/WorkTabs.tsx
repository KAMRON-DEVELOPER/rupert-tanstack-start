import BottomPillTabs from '@/components/navigation/BottomPillTabs'
import { linkOptions } from '@tanstack/react-router'

const tabs = linkOptions([
  {
    to: '/work/vacancies',
    label: 'Vacancies'
  },
  {
    to: '/work/companies',
    label: 'Companies'
  },
  {
    to: '/work/applications',
    label: 'Applications'
  }
])

const WorkTabs = () => <BottomPillTabs tabs={tabs} />

export default WorkTabs
