import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { DailyActiveUsersBucketSchema } from '@/types/stats';

const chartConfig = {
  count: {
    label: 'daily active users',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const StatsDauChart = ({ data }: { data: DailyActiveUsersBucketSchema[] }) => {
  const totalDAU = data.reduce((acc, d) => acc + d.count, 0);

  return (
    <div className='bg-card rounded-lg border'>
      <div className='border-b px-4 py-2'>
        <p className='text-md font-medium'>Daily Active Users</p>
        <p className='text-sm'>Last 30 days · {totalDAU.toLocaleString()} total sessions</p>
      </div>
      <div>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-64 w-full'>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: 0, right: 0 }}>
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={28}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-40'
                  nameKey='count'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey='count'
              fill='var(--color-count)'
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default StatsDauChart;
