import { useUsersQuery } from 'entities/users'
import { UserChangeRoleModal, UserDeleteModal } from 'features/users'
import { EllipsisVertical, Search } from 'lucide-react'
import { useState } from 'react'
import { UserResponse } from 'shared/api'
import { USERS_PER_PAGE } from 'shared/config'
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

const getItemKey = (user: UserResponse) => user.id

const headers = ['№', 'Имя', 'Почта', 'Роль', 'Дата регистрации', 'Действия']

export const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, fetchPrev, fetchNext } = usePagePaginate()
  const { data, isLoading, isError, error } = useUsersQuery({
    searchTerm,
    perPage: USERS_PER_PAGE,
    page,
  })

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Пользователи</h1>
      <InputWithLeadingIcon
        icon={Search}
        value={searchTerm}
        onChange={handleOnChange}
        placeholder="Поиск"
        className="w-full max-w-sm"
      />
      <DataTable
        data={data!}
        getItemKey={getItemKey}
        headers={headers}
        skeletonItemLength={USERS_PER_PAGE}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        renderRow={(x, i) => (
          <>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{x.name}</TableCell>
            <TableCell>{x.email}</TableCell>
            <TableCell>
              {x.role === 'ADMIN' ? 'Админ' : 'Пользователь'}
            </TableCell>
            <TableCell>{displayDate(x.createdAt)}</TableCell>
            <TableCell className="flex justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[220px] p-2 space-y-2">
                  <UserDeleteModal id={x.id} name={x.name} />
                  <UserChangeRoleModal id={x.id} role={x.role} />
                </PopoverContent>
              </Popover>
            </TableCell>
          </>
        )}
      />
    </div>
  )
}
