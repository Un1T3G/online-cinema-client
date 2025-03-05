import { PaymentGetPremiumButton } from 'features/payments'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'shared/ui'

export const PremiumPage = () => {
  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Оформить подписку</CardTitle>
          <CardDescription>
            Приобретая премиум-подписку, вы получаете доступ к тысячам часов
            киноконтента в высоком качестве.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentGetPremiumButton />
        </CardContent>
      </Card>
    </div>
  )
}
