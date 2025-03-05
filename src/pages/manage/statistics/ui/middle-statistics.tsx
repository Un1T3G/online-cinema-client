import { Bar, BarChart, Pie, PieChart, XAxis } from 'recharts'
import {
  Card,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ErrorCard,
  Skeleton,
} from 'shared/ui'
import { useMiddleStatistics } from '../statistics.model'

export const MiddleStatistics = () => {
  const {
    pieChartData,
    pieChartConfig,
    barChartData,
    barChartConfig,
    isLoading,
    isError,
    error,
  } = useMiddleStatistics()

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
        <Skeleton className="w-full xl:w-[300px]" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    )
  }

  if (isError) {
    return <ErrorCard error={error} />
  }

  return (
    <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
      <Card className="p-4 w-full xl:w-[300px] space-y-4">
        <ChartContainer
          id="pie-interactive"
          config={pieChartConfig ?? {}}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="views"
              nameKey="title"
              innerRadius={65}
              strokeWidth={60}
              paddingAngle={5}
              radius={8}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          {pieChartData?.map((x) => (
            <div key={x.title} className="text-lg">
              {x.title}
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4 w-full">
        <ChartContainer config={barChartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer data={barChartData} dataKey="total">
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </Card>
    </div>
  )
}
