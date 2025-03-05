import { useMiddleStatisticsQuery } from 'entities/statistics'
import { useMemo } from 'react'

export const useMiddleStatistics = () => {
  const {
    data: middleStatistics,
    isLoading,
    isError,
    error,
  } = useMiddleStatisticsQuery()

  const pieChartData = useMemo(
    () =>
      middleStatistics?.topMovies.map((x, i) => ({
        ...x,
        fill: `hsl(var(--chart-${i + 1}))`,
      })),
    [middleStatistics]
  )

  const pieChartConfig = useMemo(
    () =>
      pieChartData?.reduceRight(
        (x, y) => ({
          ...x,
          [y.title]: {
            label: y.title,
            color: y.fill,
          },
        }),
        {}
      ),
    [pieChartData]
  )

  return {
    pieChartData,
    pieChartConfig,
    barChartData: middleStatistics?.salesByWeek,
    barChartConfig: {
      desktop: {
        label: 'Desktop',
        color: '#fb2c36',
      },
      mobile: {
        label: 'Mobile',
        color: '#fb2c36',
      },
    },
    isLoading,
    isError,
    error,
  }
}
