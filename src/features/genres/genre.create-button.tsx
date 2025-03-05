import { useGenreCreateMutation } from 'entities/genres'
import { Layers2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { errorCatch } from 'shared/api'
import { Button } from 'shared/ui'
import { toast } from 'sonner'

export const GenreCreateButton = () => {
  const router = useRouter()
  const { mutate } = useGenreCreateMutation({
    onSuccess: (id) => {
      router.push(`/manage/genres/${id}`)
      toast.success('Категория успешно создан')
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <Button onClick={handleOnClick}>
      <Layers2 />
      <span>Создать категорию</span>
    </Button>
  )
}
