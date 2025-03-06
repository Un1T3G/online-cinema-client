import { FilesFolderType, useFileUploadMutation } from 'entities/files'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { errorCatch } from 'shared/api'
import { cn } from 'shared/lib'
import { Button, Skeleton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  onChangeSrc: (newSrc: string) => void
  folderType: FilesFolderType
  className?: string
}

export const VideoUpload = ({ onChangeSrc, folderType, className }: IProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useFileUploadMutation({
    onSuccess: (data) => {
      setIsLoading(false)
      toast.success('Файл успешно загружен')
      onChangeSrc(data[0].url)
    },
    onError: (error) => {
      setIsLoading(false)
      toast.error(errorCatch(error))
    },
  })

  const handleOnClick = () => {
    ref.current?.click()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    const formData = new FormData()
    formData.append('image', file)

    setIsLoading(true)
    mutate({
      file: formData,
      folder: folderType,
    })
  }

  return (
    <div className={cn('flex space-x-2', className)}>
      <div className="relative w-[160px] h-[160px] rounded-lg overflow-hidden border border-divider">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={'/play.webp'}
            alt="image"
            fill
            className="object-cover invert"
          />
        )}
      </div>
      <Button
        onClick={handleOnClick}
        className="w-full h-[160px] flex items-center justify-center"
        size="icon"
        variant="outline"
      >
        <Upload />
        <span>Загрузить</span>
      </Button>
      <input
        ref={ref}
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        className="hidden"
        onChange={handleOnChange}
      />
    </div>
  )
}
