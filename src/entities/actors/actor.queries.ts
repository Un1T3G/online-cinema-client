import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ActorUpdateDto,
  PaginatorWithSearchTermQuery,
  actorService,
} from 'shared/api'

export const useActorsQuery = (query?: PaginatorWithSearchTermQuery) => {
  return useQuery({
    queryKey: ['actors', ...Object.values(query ?? {})],
    queryFn: () => actorService.getAll(query),
  })
}

interface IActorCreateMutationProps {
  onSuccess?: (id: string) => void
  onError?: (error?: Error | null) => void
}

export const useActorCreateMutation = (props?: IActorCreateMutationProps) => {
  return useMutation({
    mutationKey: ['actors', 'create'],
    mutationFn: () => actorService.create(),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IActorDeleteMutationProps {
  onSuccess?: (id: string) => void
  onError?: (error?: Error | null) => void
}

export const useActorDeleteMutation = (props?: IActorDeleteMutationProps) => {
  return useMutation({
    mutationKey: ['actors', 'delete'],
    mutationFn: (id: string) => actorService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IActorUpdateMutationProps {
  onSuccess?: (id: string) => void
  onError?: (error?: Error | null) => void
}

export const useActorUpdateMutation = (
  id: string,
  props?: IActorUpdateMutationProps
) => {
  return useMutation({
    mutationKey: ['actors', 'update'],
    mutationFn: (dto: ActorUpdateDto) => actorService.update(id, dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
