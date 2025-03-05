import { MainStatistics } from './main-statistics'
import { MiddleStatistics } from './middle-statistics'

export const StatisticsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Статистика</h1>
      <MainStatistics />
      <MiddleStatistics />
    </div>
  )
}
