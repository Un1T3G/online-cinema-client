export interface GenreUpdateDto {
  slug: string
  name: string
  icon: string
  description: string
}

export interface GenreResponse {
  id: string
  name: string
  slug: string
  icon: any
  description: string
}
