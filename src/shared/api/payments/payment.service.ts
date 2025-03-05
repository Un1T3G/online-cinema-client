import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { PaymentCheckoutResponse, PaymentResponse } from './payment.types'

class PaymentService {
  async getAll(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<PaymentResponse>>('payments', {
      params: query,
    })
  }

  async checkout(amount: number) {
    return fetchAuth.post<PaymentCheckoutResponse>('payments', {
      amount,
    })
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`payments/${id}`)
  }
}

export const paymentService = new PaymentService()
