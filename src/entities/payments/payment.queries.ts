import { useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginatorQuery,
  PaymentCheckoutResponse,
  paymentService,
} from 'shared/api'
import { PREMIUM_PLAN_AMOUNT } from 'shared/config'

export const usePaymentsQuery = (query?: PaginatorQuery) => {
  return useQuery({
    queryKey: ['payments', ...Object.values(query ?? {})],
    queryFn: () => paymentService.getAll(query),
  })
}

interface IPaymentMutationProps {
  onSuccess?: (data: PaymentCheckoutResponse) => void
  onError?: (error: Error | null) => void
}

export const usePaymentMutation = (props?: IPaymentMutationProps) => {
  return useMutation({
    mutationKey: ['payment-premium'],
    mutationFn: () => paymentService.checkout(PREMIUM_PLAN_AMOUNT),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IPaymentDeleteMutationProps {
  onSuccess?: () => void
  onError?: (error: Error | null) => void
}

export const usePaymentDeleteMutation = (
  props?: IPaymentDeleteMutationProps
) => {
  return useMutation({
    mutationKey: ['payments', 'delete'],
    mutationFn: (id: string) => paymentService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
