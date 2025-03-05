import { GetServerSideProps } from 'next'
import { IMoviePageProps } from 'pages/movies'
import { movieService } from 'shared/api'

export { MoviePage as default } from 'pages/movies'
export const getServerSideProps: GetServerSideProps<IMoviePageProps> = async ({
  params,
}) => {
  try {
    const slug = params?.slug as string
    const movie = await movieService.getBySlug(slug)
    const similarMovies = await movieService.getByGenres(
      movie.genres.map((x) => x.id),
      { perPage: 4 }
    )

    return {
      props: {
        movie,
        similarMovies: similarMovies.data.filter((x) => x.id !== movie.id),
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      redirect: { destination: '/404', permanent: false },
    }
  }
}
