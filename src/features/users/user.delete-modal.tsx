import { useQueryClient } from '@tanstack/react-query'
import { useUserDeleteMutation } from 'entities/users'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { errorCatch } from 'shared/api'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  name: string
}
export const UserDeleteModal = ({ id, name }: IProps) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useUserDeleteMutation({
    onSuccess: () => toast.success('Пользователь успешно удалён'),
    onError: (error) => toast.error(errorCatch(error)),
  })
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await mutateAsync(id).catch((error) => toast.error(errorCatch(error)))
    queryClient.invalidateQueries({ queryKey: ['users'] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Trash />
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Удалить пользователя</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить пользователя {name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Закрыть</Button>
          </DialogClose>
          <Button type="submit" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
