import { GenreUpdateForm } from 'features/genres'
import { ManageGenreEditPageProps } from './manage.genre-edit.types'

export const ManageGenreEditPage = ({ genre }: ManageGenreEditPageProps) => {
  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Редактирование категорию</h1>
      <GenreUpdateForm genre={genre} />
    </div>
  )
}
