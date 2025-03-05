import { GetServerSideProps } from 'next'
import { ManageMovieEditPageProps } from 'pages/manage'
import {
  ACCESS_TOKEN_KEY,
  actorService,
  genreService,
  movieService,
} from 'shared/api'

export { ManageMovieEditPage as default } from 'pages/manage'

export const getServerSideProps: GetServerSideProps<
  ManageMovieEditPageProps
> = async ({ params, req }) => {
  try {
    const id = params?.id as string
    const accessToken = req.cookies[ACCESS_TOKEN_KEY]
    const [movie, genres, actors] = await Promise.all([
      movieService.getById(id, accessToken),
      genreService.getAll(),
      actorService.getAll(),
    ])

    return {
      props: {
        movie,
        genres: genres.data,
        actors: actors.data,
      },
    }
  } catch (error) {
    throw error
  }
}
