import { GetServerSideProps } from 'next'
import { ManageGenreEditPageProps } from 'pages/manage'
import { ACCESS_TOKEN_KEY, genreService } from 'shared/api'

export { ManageGenreEditPage as default } from 'pages/manage'

export const getServerSideProps: GetServerSideProps<
  ManageGenreEditPageProps
> = async ({ params, req }) => {
  try {
    const id = params?.id as string
    const accessToken = req.cookies[ACCESS_TOKEN_KEY]
    const genre = await genreService.getById(id, accessToken)

    return {
      props: {
        genre,
      },
    }
  } catch (error) {
    throw error
  }
}
