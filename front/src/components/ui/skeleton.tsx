import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#e3afba] dark:bg-[#702c4b]", className)}
      {...props}
    />
  )
}

export { Skeleton }
