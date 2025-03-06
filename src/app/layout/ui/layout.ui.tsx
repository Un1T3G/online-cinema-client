'use client'

import { Geist } from 'next/font/google'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import { NoSSR, cn, useIsMobile } from 'shared/lib'
import {
  Footer,
  Header,
  MobileSheet,
  NavigationBar,
  SubscribeCard,
} from 'widgets/layout'
import { Logo } from './logo'

const geistFont = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700'],
})

export const RootLayout = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isMobile) setOpen(false)
  }, [isMobile, router.asPath])

  const Sidebar = () => {
    return (
      <aside className="fixed flex flex-col justify-between top-0 left-0 bottom-0 w-[256px] border-r border-divider">
        <div>
          <Logo />
          <NavigationBar />
        </div>
        <SubscribeCard />
      </aside>
    )
  }

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div
      style={geistFont.style}
      className={cn(
        'min-h-screen flex flex-col pl-0 md:pl-[256px] pt-16 overflow-x-hidden'
      )}
    >
      <NoSSR>
        {isMobile ? (
          <MobileSheet open={open} onClose={handleToggle} logoSlot={<Logo />}>
            <NavigationBar />
            <SubscribeCard />
          </MobileSheet>
        ) : (
          <Sidebar />
        )}
      </NoSSR>
      <Header toggleMobileSheet={handleToggle} />
      <main className="flex-1 flex flex-col p-4">{children}</main>
      <Footer />
    </div>
  )
}
