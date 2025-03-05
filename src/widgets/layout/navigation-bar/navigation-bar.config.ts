import {
  Banknote,
  Clapperboard,
  Compass,
  Flame,
  Heart,
  Layers2,
  PieChart,
  Star,
  User,
  VenetianMask,
} from 'lucide-react'

export const ghostNavigationConfig = [
  {
    title: 'Главная',
    icon: Compass,
    path: '/',
  },
  {
    title: 'Фильмы',
    icon: Clapperboard,
    path: '/explorer',
  },
  {
    title: 'Популярное',
    icon: Flame,
    path: '/trending',
  },
]

export const userNavigationConfig = [
  ...ghostNavigationConfig,
  {
    title: 'Избранные',
    icon: Heart,
    path: '/favorites',
  },
]

export const adminNavigationConfig = [
  {
    title: 'Статистики',
    icon: PieChart,
    path: '/manage',
  },
  {
    title: 'Пользователи',
    icon: User,
    path: '/manage/users',
  },
  {
    title: 'Фильмы',
    icon: Clapperboard,
    path: '/manage/movies',
  },
  {
    title: 'Актеры',
    icon: VenetianMask,
    path: '/manage/actors',
  },
  {
    title: 'Жанры',
    icon: Layers2,
    path: '/manage/genres',
  },
  {
    title: 'Отзывы',
    icon: Star,
    path: '/manage/reviews',
  },
  {
    title: 'Оплаты',
    icon: Banknote,
    path: '/manage/payments',
  },
]
