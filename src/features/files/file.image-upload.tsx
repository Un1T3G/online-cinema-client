import { FilesFolderType, useFileUploadMutation } from 'entities/files'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { errorCatch } from 'shared/api'
import { cn } from 'shared/lib'
import { Button, Skeleton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  src: string
  onChangeSrc: (newSrc: string) => void
  folderType: FilesFolderType
  size?: 'DEFAULT' | 'BIG'
  className?: string
}

export const ImageUpload = ({
  src,
  onChangeSrc,
  folderType,
  className,
  size = 'DEFAULT',
}: IProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useFileUploadMutation(
    {
      onSuccess: (data) => {
        setIsLoading(false)
        toast.success('Файл успешно загружен')
        onChangeSrc(data[0].url)
      },
      onError: (error) => {
        setIsLoading(false)
        toast.error(errorCatch(error))
      },
    },
    folderType === FilesFolderType.AVATAR
  )

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
      <div
        className={cn(
          'relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-divider',
          size === 'BIG' && 'w-[160px] h-[160px]'
        )}
      >
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={Boolean(src) ? src : '/file.svg'}
            alt="image"
            fill
            className="object-cover"
          />
        )}
      </div>
      <Button
        onClick={handleOnClick}
        className={cn(
          'w-full h-[80px] flex items-center justify-center',
          size === 'BIG' && 'h-[160px]'
        )}
        size="icon"
        variant="outline"
      >
        <Upload />
        <span>Загрузить</span>
      </Button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleOnChange}
      />
    </div>
  )
}
