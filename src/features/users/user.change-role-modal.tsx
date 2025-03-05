import { useQueryClient } from '@tanstack/react-query'
import { useUserToggleRole } from 'entities/users'
import { Ruler } from 'lucide-react'
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
  role: string
}
export const UserChangeRoleModal = ({ id, role }: IProps) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useUserToggleRole({
    onSuccess: () => toast.success('Роль успешно изменена'),
    onError: (error) => toast.error(errorCatch(error)),
  })
  const queryClient = useQueryClient()

  const handleToggleRole = async () => {
    await mutateAsync({
      id,
      dto: {
        role: role === 'USER' ? 'ADMIN' : 'USER',
      },
    })
    queryClient.invalidateQueries({ queryKey: ['users'] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Ruler />
          Сменить роль
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Сменить роль</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите сменить роль?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Закрыть</Button>
          </DialogClose>
          <Button type="submit" onClick={handleToggleRole}>
            Сменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
