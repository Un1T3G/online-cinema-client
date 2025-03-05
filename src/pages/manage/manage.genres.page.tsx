import { useGenresQuery } from 'entities/genres'
import { GenreCreateButton, GenreDeleteModal } from 'features/genres'
import { EllipsisVertical, Pen, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { GenreResponse } from 'shared/api'
import { MANAGE_GENRES_PER_PAGE } from 'shared/config'
import { usePagePaginate } from 'shared/lib'
import {
  Button,
  DataTable,
  Icons,
  InputWithLeadingIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
} from 'shared/ui'

const getItemKey = (genre: GenreResponse) => genre.id

const headers = ['№', 'Название', 'Ссылка', 'Иконка', 'Действия']

export const ManageGenresPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = useGenresQuery({
    searchTerm,
    perPage: MANAGE_GENRES_PER_PAGE,
    page,
  })

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Жанры</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-x-4">
        <InputWithLeadingIcon
          icon={Search}
          value={searchTerm}
          onChange={handleOnChange}
          placeholder="Поиск"
          className="w-full max-w-sm"
        />
        <GenreCreateButton />
      </div>
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={MANAGE_GENRES_PER_PAGE}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        renderRow={(x, i) => (
          <>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{x.name}</TableCell>
            <TableCell>{x.slug}</TableCell>
            <TableCell>
              <Icons icon={x.icon} />
            </TableCell>
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <GenreDeleteModal id={x.id} name={x.name} />
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/manage/genres/${x.id}`}>
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
