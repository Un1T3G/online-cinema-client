import { Loader2 } from 'lucide-react'
import { Button } from './button'

type ButtonProps = Parameters<typeof Button>[0]

interface IProps extends ButtonProps {
  loading?: boolean
}

export const LoadingButton = ({
  loading = false,
  disabled,
  children,
  ...restProps
}: IProps) => {
  return (
    <Button disabled={loading || disabled} {...restProps}>
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  )
}
