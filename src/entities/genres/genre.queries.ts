import { useMutation, useQuery } from '@tanstack/react-query'
import {
  GenreUpdateDto,
  PaginatorWithSearchTermQuery,
  genreService,
} from 'shared/api'

export const useGenresQuery = (query?: PaginatorWithSearchTermQuery) => {
  return useQuery({
    queryKey: ['genres', ...Object.values(query ?? {})],
    queryFn: () => genreService.getAll(query),
  })
}

interface IGenreMutationProps {
  onSuccess?: (id: string) => void
  onError?: (error?: Error | null) => void
}

export const useGenreCreateMutation = (props?: IGenreMutationProps) => {
  return useMutation({
    mutationKey: ['genres', 'create'],
    mutationFn: () => genreService.create(),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

export const useGenreUpdateMutation = (
  id: string,
  props?: IGenreMutationProps
) => {
  return useMutation({
    mutationKey: ['genres', 'update'],
    mutationFn: (dto: GenreUpdateDto) => genreService.update(id, dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

export const useGenreDeleteMutation = (props?: IGenreMutationProps) => {
  return useMutation({
    mutationKey: ['genres', 'delete'],
    mutationFn: (id: string) => genreService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
