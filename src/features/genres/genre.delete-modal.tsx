import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useGenreDeleteMutation } from 'entities/genres'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { errorCatch } from 'shared/api'
import { Button, DialogFooter, DialogHeader } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  name: string
}

export const GenreDeleteModal = ({ id, name }: IProps) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useGenreDeleteMutation({
    onSuccess: () => toast.success('Категория успешно удалён'),
    onError: (error) => toast.error(errorCatch(error)),
  })
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await mutateAsync(id).catch((error) => toast.error(errorCatch(error)))
    queryClient.invalidateQueries({ queryKey: ['genres'] })
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
          <DialogTitle>Удалить актера</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить категорию: {name}?
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
