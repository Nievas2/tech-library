import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="flex w-[300px] cp:w-[328px] sm:w-[294px] md:w-[358px] lg:w-[366px] xl:w-[322.66px] h-[250px] bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full sm:w-3/4 rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-12 rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-start items-center">
          <Skeleton className="h-10 w-full sm:w-3/4 rounded-md" />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-8 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export const renderSkeletonHome = () => {
  return (
    <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5 mb-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}