import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand/react'
import { SessionStore } from './session.types'

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (value) => set({ isAuth: value }),
    }),
    {
      name: 'session',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
