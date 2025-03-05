import { useMutation, useQuery } from '@tanstack/react-query'
import { PaginatorQuery, ReviewLeaveDto, reviewService } from 'shared/api'

export const useMovieReviewsQuery = (movieId: string) => {
  return useQuery({
    queryKey: ['reviews', movieId],
    queryFn: () => reviewService.getByMovieId(movieId),
  })
}

interface IReviewCreateMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useReviewLeaveMutation = (
  movieId: string,
  props?: IReviewCreateMutationProps
) => {
  return useMutation({
    mutationKey: ['reviews'],
    mutationFn: (dto: ReviewLeaveDto) => reviewService.leave(movieId, dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

export const useReviewsQuery = (query?: PaginatorQuery) => {
  return useQuery({
    queryKey: ['reviews', ...Object.values(query ?? {})],
    queryFn: () => reviewService.getAll(query),
  })
}

interface IReviewDeleteMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useReviewDeleteMutation = (props?: IReviewDeleteMutationProps) => {
  return useMutation({
    mutationKey: ['reviews', 'delete'],
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
