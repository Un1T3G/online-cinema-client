import { usePaymentMutation } from 'entities/payments'
import { useRouter } from 'next/router'
import { errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

export const PaymentGetPremiumButton = () => {
  const router = useRouter()

  const { mutate, isPending } = usePaymentMutation({
    onSuccess: (data) => {
      console.log(data)
      router.push(data.confirmation.confirmation_url)
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <LoadingButton
      loading={isPending}
      onClick={handleOnClick}
      className="w-full"
    >
      Оформить премиум
    </LoadingButton>
  )
}
