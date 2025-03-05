import { useActorCreateMutation } from 'entities/actors'
import { VenetianMask } from 'lucide-react'
import { useRouter } from 'next/router'
import { errorCatch } from 'shared/api'
import { Button } from 'shared/ui'
import { toast } from 'sonner'

export const ActorCreateButton = () => {
  const router = useRouter()
  const { mutate } = useActorCreateMutation({
    onSuccess: (id) => {
      router.push(`/manage/actors/${id}`)
      toast.success('Актер успешно создан')
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <Button onClick={handleOnClick}>
      <VenetianMask />
      <span>Создать актера</span>
    </Button>
  )
}
