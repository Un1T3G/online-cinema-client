import { GetServerSideProps } from 'next'
import { ManageActorEditPageProps } from 'pages/manage'
import { ACCESS_TOKEN_KEY, actorService } from 'shared/api'

export { ManageActorEditPage as default } from 'pages/manage'

export const getServerSideProps: GetServerSideProps<
  ManageActorEditPageProps
> = async ({ params, req }) => {
  try {
    const id = params?.id as string
    const accessToken = req.cookies[ACCESS_TOKEN_KEY]
    const actor = await actorService.getById(id, accessToken)

    return {
      props: {
        actor,
      },
    }
  } catch (error) {
    throw error
  }
}
