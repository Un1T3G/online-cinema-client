import { Clapperboard, Eye, Star, Users } from 'lucide-react'

export const getMainStatisticsData = (name: string) => {
  switch (name) {
    case 'views':
      return {
        title: 'Просмотры',
        icon: <Eye />,
      }
    case 'films':
      return {
        title: 'Фильмы',
        icon: <Clapperboard />,
      }
    case 'users':
      return {
        title: 'Пользователи',
        icon: <Users />,
      }
    case 'average_rating':
      return {
        title: 'Средний рейтинг',
        icon: <Star />,
      }
    default:
      throw new Error('lol')
  }
}
