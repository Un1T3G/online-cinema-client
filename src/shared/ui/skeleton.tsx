import { cn } from 'shared/lib'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-100/10', className)}
      {...props}
    />
  )
}

export { Skeleton }
