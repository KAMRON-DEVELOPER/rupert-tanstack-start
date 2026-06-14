import { Bar, BarChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import type { DailyActiveUsersBucket } from '@/types/stats/stats'

const chartConfig = {
  count: {
    label: 'Registered',
    color: 'var(--chart-1)'
  },
  anonymousCount: {
    label: 'Anonymous',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

const StatsDauChart = ({ data }: { data: DailyActiveUsersBucket[] }) => {
  const totalRegistered = data.reduce((acc, d) => acc + d.count, 0)
  const totalAnonymous = data.reduce((acc, d) => acc + d.anonymousCount, 0)

  return (
    <div className="bg-card rounded-lg border">
      {/* <div className="border-b px-4 py-2">
        <p className="text-md font-medium">Daily Active Users</p>
        <p className="text-sm">Last 30 days · {total.toLocaleString()} total sessions</p>
      </div> */}

      <div className="flex items-start justify-between gap-4 border-b px-4 py-3">
        <div>
          <p className="text-md font-medium">Daily Active Users</p>
          <p className="text-muted-foreground text-sm">Last 30 days</p>
        </div>
        <div className="flex gap-4 text-right text-sm">
          <div>
            <p className="font-medium">{(totalRegistered + totalAnonymous).toLocaleString()}</p>
            <p className="text-muted-foreground">total</p>
          </div>
          <div>
            <p className="font-medium">{totalRegistered.toLocaleString()}</p>
            <p className="text-muted-foreground">registered</p>
          </div>
          <div>
            <p className="font-medium">{totalAnonymous.toLocaleString()}</p>
            <p className="text-muted-foreground">anonymous</p>
          </div>
        </div>
      </div>

      {/* <div>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: 0, right: 0 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={28}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-40"
                  nameKey="count"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  }}
                />
              }
            />
            <Bar dataKey="count" fill="var(--color-count)" />
          </BarChart>
        </ChartContainer>
      </div> */}

      <div>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: 0, right: 0 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={28}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-44"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  }
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="count" stackId="a" fill="var(--color-count)" radius={[0, 0, 4, 4]} />
            <Bar
              dataKey="anonymousCount"
              stackId="a"
              fill="var(--color-anonymousCount)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

export default StatsDauChart
