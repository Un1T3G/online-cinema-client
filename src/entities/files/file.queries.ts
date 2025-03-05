import { useMutation } from '@tanstack/react-query'
import { FileResponse, FileUploadDto, fileService } from 'shared/api'

interface IFileUploadMutationProps {
  onSuccess?: (data: FileResponse[]) => void
  onError?: (error?: Error | null) => void
}

export const useFileUploadMutation = (
  props?: IFileUploadMutationProps,
  isAvatar = false
) => {
  return useMutation({
    mutationKey: ['file'],
    mutationFn: (dto: FileUploadDto) =>
      isAvatar
        ? fileService.uploadAvatar({ file: dto.file })
        : fileService.upload(dto),
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
