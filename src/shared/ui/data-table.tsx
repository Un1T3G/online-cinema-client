import { ReactNode } from 'react'
import { PaginationResult } from 'shared/api'
import { arrayRange, cn } from 'shared/lib'
import { Button } from './button'
import { Card } from './card'
import { ErrorCard } from './error-card'
import { Skeleton } from './skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

interface IProps<T> {
  headers: string[]
  isLoading: boolean
  isError: boolean
  skeletonItemLength: number
  error?: Error | null
  data: PaginationResult<T>
  getItemKey: (item: T) => string | number
  renderRow: (item: T, index: number) => ReactNode
  fetchPrev?: VoidFunction
  fetchNext?: VoidFunction
  className?: string
}

export const DataTable = <T,>({
  headers,
  isLoading,
  skeletonItemLength,
  isError,
  error,
  data,
  renderRow,
  getItemKey,
  fetchPrev,
  fetchNext,
  className,
}: IProps<T>) => {
  if (isError) {
    return <ErrorCard error={error} />
  }

  const isEmpty = data?.data.length === 0

  return (
    <div className={cn('space-y-2', className)}>
      <Card className="p-2 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((title, i) => (
                <TableHead
                  key={i}
                  className={i + 1 === headers.length ? 'text-right' : ''}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? arrayRange(skeletonItemLength).map((x) => (
                  <TableRow key={x}>
                    {arrayRange(headers.length).map((y) => (
                      <TableCell key={y}>
                        <Skeleton className="rounded-lg w-full h-9" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.data.map((item, i) => (
                  <TableRow key={getItemKey(item)}>
                    {renderRow(item, i)}
                  </TableRow>
                ))}
          </TableBody>
          {isEmpty && (
            <TableCaption className="py-12">Не чего не найдено</TableCaption>
          )}
        </Table>
      </Card>
      {(data?.meta.next || data?.meta.prev) && (
        <div className="flex justify-end space-y-2">
          {data.meta.prev && (
            <Button variant="outline" onClick={fetchPrev}>
              Предыдущая
            </Button>
          )}
          {data.meta.next && (
            <Button variant="outline" onClick={fetchNext}>
              Следующая
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
