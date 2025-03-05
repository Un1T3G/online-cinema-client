import { useMovieCreateMutation } from 'entities/movies'
import { Clapperboard } from 'lucide-react'
import { useRouter } from 'next/router'
import { errorCatch } from 'shared/api'
import { Button } from 'shared/ui'
import { toast } from 'sonner'

export const MovieCreateButton = () => {
  const router = useRouter()
  const { mutate } = useMovieCreateMutation({
    onSuccess: (id) => {
      router.push(`/manage/movies/${id}`)
      toast.success('Фильм успешно создан')
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <Button onClick={handleOnClick}>
      <Clapperboard />
      <span>Создать фильм</span>
    </Button>
  )
}
