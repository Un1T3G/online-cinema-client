import { useCallback, useState } from 'react'

export const usePagePaginate = () => {
  const [page, setPage] = useState(1)

  const fetchNext = useCallback(() => setPage((prev) => prev + 1), [])
  const fetchPrev = useCallback(() => setPage((prev) => prev - 1), [])

  return {
    page,
    fetchNext,
    fetchPrev,
  }
}
