import { Link } from '@tanstack/react-router'
import { Code, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ADMIN_SECTIONS = [
  {
    title: 'Locations',
    description: 'Manage countries and city records.',
    to: '/admin/locations',
    icon: MapPin
  },
  {
    title: 'Skills',
    description: 'Manage platform skill taxonomy.',
    to: '/admin/skills',
    icon: Code
  }
] as const

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage platform reference data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section.to} to={section.to}>
            <Card className="hover:bg-muted/50 h-full transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <section.icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
