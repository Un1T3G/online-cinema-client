import * as LucideIcons from 'lucide-react/icons'
import { JSX } from 'react'

export type TIconType = keyof typeof LucideIcons

interface IProps {
  icon: TIconType
  className?: string
}

export const Icons = ({ icon, className }: IProps) => {
  const IconComponent = LucideIcons[icon] as JSX.ElementType

  return <IconComponent className={className} />
}
