import { useSessionStore } from 'entities/session'
import { ReviewLeaveModal, Reviews } from 'widgets/reviews'

interface IProps {
  movieId: string
}

export const MovieReview = ({ movieId }: IProps) => {
  const isAuth = useSessionStore((state) => state.isAuth)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Отзывы</h2>
      {isAuth && <ReviewLeaveModal movieId={movieId} className="mb-4" />}
      <Reviews movieId={movieId} />
    </div>
  )
}
