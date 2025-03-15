import { CircleAlert } from 'lucide-react'
import { Card, CardDescription } from 'shared/ui'

export const AttentionBlock = () => {
  return (
    <Card className="p-4">
      <CardDescription className="flex items-center space-x-2">
        <div>
          <CircleAlert className="text-red-500" />
        </div>
        <span>
          Внимание: Сервер работает на картошке 🥔! Возможно всё бдеть
          подгружаться медленно {':('}
        </span>
      </CardDescription>
    </Card>
  )
}
