import { GetStaticProps } from 'next'
import { HomePageProps } from 'pages/home'
import { actorService, movieService } from 'shared/api'

export { HomePage as default } from 'pages/home'

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [slides, trendingMovies, bestActors] = await Promise.all([
      movieService.getAll({ perPage: 3 }),
      movieService.getMostPopularMovies({ perPage: 7 }),
      actorService.getAll({ perPage: 7 }),
    ])

    return {
      props: {
        slides: slides.data,
        trendingMovies: trendingMovies.data,
        bestActors: bestActors.data,
      },
    }
  } catch (error) {
    throw error
  }
}
