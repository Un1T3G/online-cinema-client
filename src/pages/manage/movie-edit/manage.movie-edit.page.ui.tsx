import { FilesFolderType } from 'entities/files'
import { ImageUpload, VideoUpload } from 'features/files'
import { MovieUpdateForm } from 'features/movies'
import { ManageMovieEditPageProps } from './manage.movie-edit.types'

export const ManageMovieEditPage = ({
  movie,
  actors,
  genres,
}: ManageMovieEditPageProps) => {
  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl">Редактирование фильма</h1>
      <MovieUpdateForm
        movie={movie}
        genres={genres}
        actors={actors}
        imageUploadSlot={(props) => (
          <ImageUpload
            {...props}
            folderType={FilesFolderType.MOVIES}
            size="BIG"
          />
        )}
        videoUploadSlot={(props) => (
          <VideoUpload {...props} folderType={FilesFolderType.MOVIES} />
        )}
      />
    </div>
  )
}
