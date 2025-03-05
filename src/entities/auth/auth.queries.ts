import { useMutation } from '@tanstack/react-query'
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  authService,
} from 'shared/api'

interface IAuthMutationProps {
  onSuccess?: (data: AuthResponse) => void
  onError?: (error?: Error | null) => void
}

export const useAuthLoginMutation = (props?: IAuthMutationProps) => {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (dto: AuthLoginDto) => authService.login(dto),
    onError: props?.onError,
    onSuccess: props?.onSuccess,
  })
}

export const useAuthRegisterMutation = (props?: IAuthMutationProps) => {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (dto: AuthRegisterDto) => authService.register(dto),
    onError: props?.onError,
    onSuccess: props?.onSuccess,
  })
}
