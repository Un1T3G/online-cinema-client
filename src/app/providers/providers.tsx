import { PropsWithChildren } from 'react'
import { ReactQueryProvider } from './react-query.provider'
import { SessionProvider } from './session.provider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReactQueryProvider>
  )
}
