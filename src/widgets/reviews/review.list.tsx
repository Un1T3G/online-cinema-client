import { ReviewItem, useMovieReviewsQuery } from 'entities/reviews'
import { ErrorCard, Skeleton } from 'shared/ui'

interface IProps {
  movieId: string
}

export const Reviews = ({ movieId }: IProps) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(movieId)

  if (isError) {
    return <ErrorCard error={error} />
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-[134px] w-full rounded-lg" />
          ))}
      </div>
    )
  }

  if (data && data.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    )
  }

  return <div>У этого фильма нету ни одного отзыва</div>
}
