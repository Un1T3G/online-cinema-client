import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { SITE_TITLE } from 'shared/config'
import { Toaster } from 'shared/ui'
import { RootLayout } from './layout/'
import { Providers } from './providers'
import './styles.css'

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <NextSeo nofollow noindex title={SITE_TITLE} />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <Toaster />
    </Providers>
  )
}
