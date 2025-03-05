import { usePaymentsQuery } from 'entities/payments'
import { PaymentDeleteModal } from 'features/payments'
import { EllipsisVertical } from 'lucide-react'
import { PaymentResponse, PaymentStatus } from 'shared/api'

import { MANAGE_PAYMENTS_PER_PAGE } from 'shared/config'
import { displayDate, usePagePaginate } from 'shared/lib'
import {
  Button,
  DataTable,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
} from 'shared/ui'

const getItemKey = (payment: PaymentResponse) => payment.id

const getStatus = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.PENDING:
      return 'Ожидает оплаты'
    case PaymentStatus.PAYED:
      return 'Оплачено'
  }
}

const headers = ['№', 'Статус', 'Дата оплаты', 'Сумма', 'Действия']

export const ManagePaymentsPage = () => {
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = usePaymentsQuery({
    perPage: MANAGE_PAYMENTS_PER_PAGE,
    page,
  })

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Оплаты</h1>
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={MANAGE_PAYMENTS_PER_PAGE}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        renderRow={(x, i) => (
          <>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{getStatus(x.status)}</TableCell>
            <TableCell>{displayDate(x.createdAt)}</TableCell>
            <TableCell>{x.amount}</TableCell>
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <PaymentDeleteModal id={x.id} />
                </PopoverContent>
              </Popover>
            </TableCell>
          </>
        )}
      />
    </div>
  )
}
