import { Skeleton } from "@/components/ui/skeleton"

const SkeletonsAdminDashboard = () => {
  return (
    <div className="flex bg-main/15 flex-col justify-between border border-dark dark:border-light rounded-md shadow-xl p-4 min-w-[300px] sm:min-w-[300px] md:min-w-[320px]">
      <div className="flex flex-1 flex-row gap-2 mb-4">
        <Skeleton className="flex h-8 w-6/12 rounded-md" />
        <div className="flex justify-end w-6/12">
          <Skeleton className="flex h-8 w-8/12 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

export const renderSkeletonsAdminDashboard = () => {
  return (
    <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
      {Array.from({ length: 9 }).map(() => (
        <SkeletonsAdminDashboard key={crypto.randomUUID()} />
      ))}
    </div>
  )
}
