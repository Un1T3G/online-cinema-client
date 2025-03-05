import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
  MovieUpdateDto,
  PaginatorWithSearchTermQuery,
  movieService,
} from 'shared/api'

export const useMoviesQuery = (
  query?: PaginatorWithSearchTermQuery,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['movies', ...Object.values(query ?? {})],
    queryFn: () => movieService.getAll(query),
    enabled,
  })
}

export const useMoviesInfinityQuery = () => {
  return useInfiniteQuery({
    queryKey: ['infinity-movies'],
    queryFn: ({ pageParam }) =>
      movieService.getAll({
        page: pageParam,
        perPage: 9,
      }),
    getNextPageParam: (x) => x.meta.next ?? undefined,
    getPreviousPageParam: (x) => x.meta.prev ?? undefined,
    initialPageParam: 1,
  })
}

export const useTrendingMoviesInfinityQuery = () => {
  return useInfiniteQuery({
    queryKey: ['trending-movies'],
    queryFn: ({ pageParam }) =>
      movieService.getAll({
        page: pageParam,
        perPage: 9,
      }),
    getNextPageParam: (x) => x.meta.next ?? undefined,
    getPreviousPageParam: (x) => x.meta.prev ?? undefined,
    initialPageParam: 1,
  })
}

export const useMoviesByGenreInfinityQuery = (genreIds: string[]) => {
  return useInfiniteQuery({
    queryKey: ['movies-by-genres', genreIds],
    queryFn: ({ pageParam }) =>
      movieService.getByGenres(genreIds, {
        page: pageParam,
        perPage: 9,
      }),
    getNextPageParam: (x) => x.meta.next ?? undefined,
    getPreviousPageParam: (x) => x.meta.prev ?? undefined,
    initialPageParam: 1,
  })
}

export const useMoviesByActorInfinityQuery = (actorId: string) => {
  return useInfiniteQuery({
    queryKey: ['movies-by-actor', actorId],
    queryFn: ({ pageParam }) =>
      movieService.getByActor(actorId, {
        page: pageParam,
        perPage: 9,
      }),
    getNextPageParam: (x) => x.meta.next ?? undefined,
    getPreviousPageParam: (x) => x.meta.prev ?? undefined,
    initialPageParam: 1,
  })
}

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => movieService.getFavorites(),
  })
}

interface IIncreaseMovieViewsMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useIncreaseMovieViewsMutation = (
  movieSlug: string,
  props?: IIncreaseMovieViewsMutationProps
) => {
  return useMutation({
    mutationKey: ['movie', movieSlug],
    mutationFn: () => movieService.updateCountViews(movieSlug),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IMovieDeleteMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useMovieDeleteMutation = (props?: IMovieDeleteMutationProps) => {
  return useMutation({
    mutationKey: ['movies', 'delete'],
    mutationFn: (id: string) => movieService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IMovieUpdateMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useMovieUpdateMutation = (
  id: string,
  props?: IMovieUpdateMutationProps
) => {
  return useMutation({
    mutationKey: ['movies', 'update'],
    mutationFn: (dto: MovieUpdateDto) => movieService.update(id, dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IMovieCreateMutationProps {
  onSuccess?: (id: string) => void
  onError?: (error?: Error | null) => void
}

export const useMovieCreateMutation = (props?: IMovieCreateMutationProps) => {
  return useMutation({
    mutationKey: ['movies', 'create'],
    mutationFn: () => movieService.create(),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
