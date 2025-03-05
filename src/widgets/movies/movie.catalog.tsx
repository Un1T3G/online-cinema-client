import { NextSeo } from 'next-seo'
import { ReactNode } from 'react'
import { cn } from 'shared/lib'

interface IProps {
  title: string
  description?: string
  moviesSlot: ReactNode
}

export const MovieCatalog = ({ title, description, moviesSlot }: IProps) => {
  return (
    <>
      <NextSeo title={title} />
      <h1 className={cn('text-xl font-bold', description ? 'mb-1' : 'mb-3')}>
        {title}
      </h1>
      {description && (
        <p className="text-base text-muted-foreground mb-4">{description}</p>
      )}
      {moviesSlot}
    </>
  )
}
