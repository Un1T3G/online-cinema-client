import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

const _NoSsr = ({ children }: PropsWithChildren) => <>{children}</>

export const NoSSR = dynamic(() => Promise.resolve(_NoSsr), {
  ssr: false,
})
