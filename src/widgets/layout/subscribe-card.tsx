import { PaymentGetPremiumButton } from 'features/payments'
import { useRouter } from 'next/router'
import { Card, CardTitle } from 'shared/ui'

export const SubscribeCard = () => {
  const router = useRouter()

  const isAdminRoute = router.asPath.includes('manage')

  if (isAdminRoute) {
    return null
  }

  return (
    <Card className="m-4 p-4 space-y-2">
      <CardTitle>Премиум подписка</CardTitle>
      <p className="text-muted-foreground text-sm">
        С премиум-подпиской у вас неограниченный доступ ко всем фильмам.
      </p>
      <PaymentGetPremiumButton />
    </Card>
  )
}
