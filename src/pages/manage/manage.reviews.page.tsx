import { useReviewsQuery } from 'entities/reviews'
import { ReviewsDeleteModal } from 'features/reviews'
import { EllipsisVertical, Star } from 'lucide-react'
import { ReviewResponse } from 'shared/api'

import { MANAGE_REVIEWS_PER_PAGE } from 'shared/config'
import { arrayRange, usePagePaginate } from 'shared/lib'
import {
  Button,
  DataTable,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
} from 'shared/ui'

const getItemKey = (review: ReviewResponse) => review.id

const headers = ['№', 'Рейтинг', 'Имя пользователя', 'Действия']

export const ManageReviewsPage = () => {
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = useReviewsQuery({
    perPage: MANAGE_REVIEWS_PER_PAGE,
    page,
  })

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Отзывы</h1>
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={MANAGE_REVIEWS_PER_PAGE}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        renderRow={(x, i) => (
          <>
            <TableCell>{i + 1}</TableCell>
            <TableCell className="flex">
              {arrayRange(5).map((_, i) => (
                <Star
                  className={
                    x.rating > i ? 'text-yellow-500' : 'text-muted-foreground'
                  }
                  size={16}
                />
              ))}
            </TableCell>
            <TableCell>{x.user.name}</TableCell>
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <ReviewsDeleteModal id={x.id} />
                </PopoverContent>
              </Popover>
            </TableCell>
          </>
        )}
      />
    </div>
  )
}
