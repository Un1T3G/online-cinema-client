import { Star } from 'lucide-react'
import Image from 'next/image'
import { ReviewResponse } from 'shared/api'
import { displayDate } from 'shared/lib'
import { Card } from 'shared/ui'

interface IProps {
  review: ReviewResponse
}

export const ReviewItem = ({ review }: IProps) => {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative w-9 h-9 rounded-full overflow-hidden">
          <Image
            alt={review.user.name}
            src={
              Boolean(review.user.avatarUrl)
                ? review.user.avatarUrl
                : '/default-avatar.jpg'
            }
            fill
            className="object-cover"
          />
        </div>
        <span className="block text-base font-bold">{review.user.name}</span>
      </div>
      <p className="text-muted-foreground text-base">{review.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className={
                  review.rating > i
                    ? 'text-yellow-500'
                    : 'text-muted-foreground'
                }
                size={16}
              />
            ))}
        </div>
        <span className="block text-muted-foreground">
          {displayDate(review.createdAt)}
        </span>
      </div>
    </Card>
  )
}
