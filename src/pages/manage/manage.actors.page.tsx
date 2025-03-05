import { useActorsQuery } from 'entities/actors'
import { ActorCreateButton, ActorDeleteModal } from 'features/actors'
import { EllipsisVertical, Pen, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ActorResponse } from 'shared/api'
import { MANAGE_ACTORS_PER_PAGE } from 'shared/config'
import { usePagePaginate } from 'shared/lib'
import {
  Button,
  DataTable,
  InputWithLeadingIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
} from 'shared/ui'

const getItemKey = (actor: ActorResponse) => actor.id

const headers = ['№', 'Название', 'Ссылка', 'Действия']

export const ManageActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = useActorsQuery({
    searchTerm,
    perPage: MANAGE_ACTORS_PER_PAGE,
    page,
  })

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Актеры</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-x-4">
        <InputWithLeadingIcon
          icon={Search}
          value={searchTerm}
          onChange={handleOnChange}
          placeholder="Поиск"
          className="w-full max-w-sm"
        />
        <ActorCreateButton />
      </div>
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={MANAGE_ACTORS_PER_PAGE}
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
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <ActorDeleteModal id={x.id} name={x.name} />
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/manage/actors/${x.id}`}>
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
