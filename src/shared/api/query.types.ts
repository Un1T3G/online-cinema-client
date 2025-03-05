export interface PaginatorQuery {
  perPage?: number
  page?: number
}

export interface PaginatorWithSearchTermQuery extends PaginatorQuery {
  searchTerm?: string
}

export interface PaginationResult<T> {
  data: T[]
  meta: {
    prev: number | null
    next: number | null
  }
}
