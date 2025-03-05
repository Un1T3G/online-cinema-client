import { GetServerSideProps } from 'next'
import { IMoviesByActorPageProps } from 'pages/movies'
import { actorService } from 'shared/api'

export { MoviesByActorPage as default } from 'pages/movies'

export const getServerSideProps: GetServerSideProps<
  IMoviesByActorPageProps
> = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const actor = await actorService.getBySlug(slug)

    return {
      props: {
        actor,
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
