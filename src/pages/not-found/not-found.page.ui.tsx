import Link from 'next/link'
import { Button } from 'shared/ui'

export const NotFoundPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">404. Страница не найдена</h1>
      <p className="text-muted-foreground text-base">
        Хм, похоже, эта страница не существует.
      </p>
      <Button asChild>
        <Link href="/">Перейти на главную</Link>
      </Button>
    </div>
  )
}
