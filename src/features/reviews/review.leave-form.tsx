import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useReviewLeaveMutation } from 'entities/reviews'
import { Star } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ReviewLeaveDto, errorCatch, reviewLeaveSchema } from 'shared/api'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputWithLeadingIcon,
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  movieId: string
  onLeavedReview?: VoidFunction
}

export const ReviewLeaveForm = ({ movieId, onLeavedReview }: IProps) => {
  const form = useForm<ReviewLeaveDto>({
    defaultValues: {
      rating: '1' as any,
      text: '',
    },
    resolver: zodResolver(reviewLeaveSchema) as any,
    mode: 'onSubmit',
  })
  const queryClient = useQueryClient()
  const { mutate } = useReviewLeaveMutation(movieId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
      toast.success('Отзыв успешно отправлен')
      onLeavedReview?.()
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const onSubmit = form.handleSubmit((data: ReviewLeaveDto) => {
    mutate({
      rating: Number(data.rating),
      text: data.text,
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <FormField
          name="rating"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Рейтинг</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Star}
                  type="number"
                  placeholder="jhon.doe@example.com"
                  min={1}
                  max={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Текст</FormLabel>
              <FormControl>
                <Textarea placeholder="Ваш отзыв" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Оставить
        </Button>
      </form>
    </Form>
  )
}
