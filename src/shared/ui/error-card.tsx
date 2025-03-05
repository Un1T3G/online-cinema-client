import { cn } from 'shared/lib'
import { Card, CardTitle } from './card'

interface IProps {
  error?: Error | null
  className?: string
}

export const ErrorCard = ({ error, className }: IProps) => {
  return (
    <Card className={cn('p-4', className)}>
      <CardTitle className="text-red-500">{error?.message}</CardTitle>
    </Card>
  )
}
