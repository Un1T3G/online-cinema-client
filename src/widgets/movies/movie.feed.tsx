import { InfiniteData } from '@tanstack/react-query'
import { MovieItem } from 'entities/movies'
import { Fragment } from 'react'
import { MovieResponse, PaginationResult } from 'shared/api'
import { arrayRange } from 'shared/lib'
import { Button, Skeleton } from 'shared/ui'

interface IProps {
  data: InfiniteData<PaginationResult<MovieResponse>, unknown> | undefined
  hasNextPage: boolean
  isLoading: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const MovieFeed = ({
  data,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
}: IProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arrayRange(6).map((x) => (
          <Skeleton key={x} className="h-44 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                className="h-44"
                showBigPoster={true}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button disabled={isFetchingNextPage} onClick={fetchNextPage}>
            {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        </div>
      )}
    </>
  )
}
