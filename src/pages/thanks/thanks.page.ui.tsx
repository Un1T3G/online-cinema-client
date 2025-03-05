import Link from 'next/link'
import { Button } from 'shared/ui'

export const ThanksPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Успешная покупка</h1>
      <p className="text-muted-foreground text-base mb-2">
        Спасибо Вам за приобретение на нашем сайте.
      </p>
      <Button asChild>
        <Link href="/profile">Перейти в личный кабинет</Link>
      </Button>
    </div>
  )
}
