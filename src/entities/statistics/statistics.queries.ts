import { useQuery } from '@tanstack/react-query'
import { statisticsService } from 'shared/api'

export const useMainStatisticsQuery = () => {
  return useQuery({
    queryKey: ['main-statistics'],
    queryFn: () => statisticsService.getMain(),
  })
}

export const useMiddleStatisticsQuery = () => {
  return useQuery({
    queryKey: ['middle-statistics'],
    queryFn: () => statisticsService.getMiddle(),
  })
}
