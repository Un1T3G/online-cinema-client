import { useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginatorWithSearchTermQuery,
  UserChangeRoleDto,
  UserToggleFavoriteDto,
  UserUpdateDto,
  userService,
} from 'shared/api'

export const useUsersQuery = (query?: PaginatorWithSearchTermQuery) => {
  return useQuery({
    queryKey: ['users', Object.values(query ?? {})],
    queryFn: () => userService.getAll(query),
  })
}

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getProfile(),
  })
}

interface IUserUpdateProfileMutationProps {
  onSuccess?: (data: string) => void
  onError?: (error?: Error | null) => void
}

export const useUserUpdateProfileMutation = (
  props?: IUserUpdateProfileMutationProps
) => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: (dto: UserUpdateDto) => userService.update(dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IUserToggleFavoriteMutationProps {
  onSuccess?: (value: boolean) => void
  onError?: (error?: Error | null) => void
}

export const useUserToggleFavoriteMutation = (
  props?: IUserToggleFavoriteMutationProps
) => {
  return useMutation({
    mutationKey: ['favorites'],
    mutationFn: (dto: UserToggleFavoriteDto) => userService.toggleFavorite(dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IUserMutationProps {
  onSuccess?: () => void
  onError?: (error?: Error | null) => void
}

export const useUserDeleteMutation = (props?: IUserMutationProps) => {
  return useMutation({
    mutationKey: ['users', 'delete'],
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

interface IUserToggleRoleProps {
  id: string
  dto: UserChangeRoleDto
}

export const useUserToggleRole = (props?: IUserMutationProps) => {
  return useMutation({
    mutationKey: ['users', 'toggle-role'],
    mutationFn: ({ id, dto }: IUserToggleRoleProps) =>
      userService.changeRole(id, dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
