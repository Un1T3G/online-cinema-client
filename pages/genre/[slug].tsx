import { GetServerSideProps } from 'next'
import { IMoviesByGenrePageProps } from 'pages/movies'
import { genreService } from 'shared/api'

export { MoviesByGenrePage as default } from 'pages/movies'

export const getServerSideProps: GetServerSideProps<
  IMoviesByGenrePageProps
> = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const genre = await genreService.getBySlug(slug)

    return {
      props: {
        genre,
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
