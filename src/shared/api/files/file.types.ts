export interface FileUploadDto {
  file: FormData
  folder?: string
}

export interface FileResponse {
  url: string
  name: string
}
