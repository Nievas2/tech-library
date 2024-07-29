import { Skeleton } from "@/components/ui/skeleton"

const SkeletonTag = () => {
  return (
    <div className="flex w-[80px] rounded-md h-[34px] bg-main/15 justify-center items-center">
      <Skeleton className="h-4 w-3/4 " />
    </div>
  )
}

export const renderSkeletonSideBar = () => {
  return (
    <div className="flex flex-wrap gap-3 ">
      {Array.from({ length: 14 }).map((_, index) => (
        <SkeletonTag key={index} />
      ))}
    </div>
  )
}
