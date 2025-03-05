import { ReviewLeaveForm } from 'features/reviews'
import { X } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

interface IProps {
  movieId: string
  className?: string
}

export const ReviewLeaveModal = ({ movieId, className }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>Оставить отзыв</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Отзыв</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="ghost" size="icon">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <ReviewLeaveForm movieId={movieId} />
      </DialogContent>
    </Dialog>
  )
}
