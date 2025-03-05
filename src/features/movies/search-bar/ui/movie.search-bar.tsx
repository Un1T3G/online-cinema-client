import { useMoviesQuery } from 'entities/movies'
import { Search } from 'lucide-react'
import { useState } from 'react'
import {
  InputWithLeadingIcon,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from 'shared/ui'
import { MoviesList } from './movie.list'

export const MoviesSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const enabled = searchTerm.length > 0

  const { data, isLoading } = useMoviesQuery(
    {
      searchTerm,
      perPage: 3,
    },
    enabled
  )

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <Popover open={enabled}>
        <PopoverAnchor asChild>
          <InputWithLeadingIcon
            icon={Search}
            placeholder="Поиск"
            className="w-full max-w-sm"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </PopoverAnchor>
        <PopoverContent
          className="w-96 p-4 bg-card"
          align="start"
          sideOffset={8}
        >
          <MoviesList isLoading={isLoading} movies={data?.data || []} />
        </PopoverContent>
      </Popover>
    </>
  )
}
