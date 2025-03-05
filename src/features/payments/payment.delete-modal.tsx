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
}
export const PaymentDeleteModal = ({ id }: IProps) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useUserDeleteMutation({
    onSuccess: () => toast.success('Оплата успешно удалён'),
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleDelete = async () => {
    await mutateAsync(id).catch((error) => toast.error(errorCatch(error)))
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
          <DialogTitle>Удалить оплату</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить оплату?
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
