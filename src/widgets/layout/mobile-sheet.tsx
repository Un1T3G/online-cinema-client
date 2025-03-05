'use client'

import { useUserProfileQuery } from 'entities/users'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Button, Sheet, SheetContent } from 'shared/ui/'

interface IProps extends PropsWithChildren {
  open: boolean
  onClose: VoidFunction
}

export const MobileSheet = ({ open, onClose, children }: IProps) => {
  const { data: user } = useUserProfileQuery()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="p-0">
        <div className="p-4 space-y-2">
          {user ? (
            <>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/profile">Профиль</Link>
              </Button>
              {user.role === 'ADMIN' && (
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/manage">Админка</Link>
                </Button>
              )}
            </>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/auth/login">Войти</Link>
            </Button>
          )}
        </div>

        {children}
      </SheetContent>
    </Sheet>
  )
}
