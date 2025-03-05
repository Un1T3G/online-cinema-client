import { useMoviesQuery } from 'entities/movies'
import { MovieCreateButton, MovieDeleteModal } from 'features/movies'
import { EllipsisVertical, Pen, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { MovieResponse } from 'shared/api'
import { MANAGE_MOVIES_PER_PAGE } from 'shared/config'
import { displayDate, usePagePaginate } from 'shared/lib'
import {
  Button,
  DataTable,
  InputWithLeadingIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
} from 'shared/ui'

const getItemKey = (movie: MovieResponse) => movie.id

const headers = [
  '№',
  'Название',
  'Просмотры',
  'Жанры',
  'Дата создания',
  'Действия',
]

export const ManageMoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = useMoviesQuery({
    searchTerm,
    perPage: MANAGE_MOVIES_PER_PAGE,
    page,
  })

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Фильмы</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-x-4">
        <InputWithLeadingIcon
          icon={Search}
          value={searchTerm}
          onChange={handleOnChange}
          placeholder="Поиск"
          className="w-full max-w-sm"
        />
        <MovieCreateButton />
      </div>
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={MANAGE_MOVIES_PER_PAGE}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        renderRow={(x, i) => (
          <>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{x.title}</TableCell>
            <TableCell>{x.views}</TableCell>
            <TableCell>{x.genres.map((x) => x.name).join(', ')}</TableCell>
            <TableCell>{displayDate(x.createdAt)}</TableCell>
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <MovieDeleteModal id={x.id} title={x.title} />
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/manage/movies/${x.id}`}>
                      <Pen />
                      Редактировать
                    </Link>
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          </>
        )}
      />
    </div>
  )
}
