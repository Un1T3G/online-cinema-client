import {
  adminNavigationConfig,
  ghostNavigationConfig,
  userNavigationConfig,
} from './navigation-bar.config'

type NavigationBarConfig = 'ghost' | 'user' | 'admin'

export const getNavigationBarConfig = (type: NavigationBarConfig) => {
  switch (type) {
    case 'ghost':
      return ghostNavigationConfig
    case 'user':
      return userNavigationConfig
    case 'admin':
      return adminNavigationConfig
    default:
      throw new Error('lol')
  }
}
