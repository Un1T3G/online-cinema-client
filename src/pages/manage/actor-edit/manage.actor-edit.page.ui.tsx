import { FilesFolderType } from 'entities/files'
import { ActorUpdateForm } from 'features/actors'
import { ImageUpload } from 'features/files'
import { ManageActorEditPageProps } from './manage.actor-edit.types'

export const ManageActorEditPage = ({ actor }: ManageActorEditPageProps) => {
  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Редактирование актера</h1>
      <ActorUpdateForm
        actor={actor}
        imageUploadSlot={(props) => (
          <ImageUpload
            {...props}
            folderType={FilesFolderType.ACTORS}
            size="BIG"
          />
        )}
      />
    </div>
  )
}
