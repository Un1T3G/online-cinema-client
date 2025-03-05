import { FilesFolderType } from 'entities/files'
import { ImageUpload } from 'features/files'
import { UserUpdateForm } from 'features/users'
import { X } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

export const UserUpdateModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Редактировать</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Редактировать профиль</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="ghost" size="icon">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <UserUpdateForm
          imageUploadSlot={(props) => (
            <ImageUpload {...props} folderType={FilesFolderType.AVATAR} />
          )}
        />
      </DialogContent>
    </Dialog>
  )
}
