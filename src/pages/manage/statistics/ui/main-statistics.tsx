import { useMainStatisticsQuery } from 'entities/statistics'
import { arrayRange } from 'shared/lib'
import { Card, ErrorCard, Skeleton } from 'shared/ui'
import { getMainStatisticsData } from '../statistics.lib'

export const MainStatistics = () => {
  const {
    data: mainStatistics,
    isLoading,
    isError,
    error,
  } = useMainStatisticsQuery()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {arrayRange(4).map((x) => (
          <Skeleton key={x} className="rounded-lg h-[102px]" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorCard error={error} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {mainStatistics!.map((x) => {
        const { title, icon } = getMainStatisticsData(x.name)

        return (
          <Card key={x.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">{title}</h2>
              {icon}
            </div>
            <span className="text-2xl font-extrabold">
              {Number(x.value).toFixed(x.name === 'average_rating' ? 1 : 0)}
            </span>
          </Card>
        )
      })}
    </div>
  )
}
