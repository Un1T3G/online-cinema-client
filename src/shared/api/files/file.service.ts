import { fetchAuth } from '../fetch'
import { FileResponse, FileUploadDto } from './file.types'

class FileService {
  async upload(dto: FileUploadDto) {
    return fetchAuth.post<FileResponse[]>('files', dto.file, {
      params: {
        folder: dto.folder,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async uploadAvatar(dto: Pick<FileUploadDto, 'file'>) {
    return fetchAuth.post<FileResponse[]>('files/avatar', dto.file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export const fileService = new FileService()
