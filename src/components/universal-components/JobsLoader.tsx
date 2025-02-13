import { Skeleton } from "@components"

export const JobsLoader: React.FC = () => {
  return <div className="flex gap-2 items-start">
    <Skeleton className="w-16 h-16" />
    <div className="flex flex-col gap-1">
      <Skeleton className="w-52 h-4 rounded-md" />
      <Skeleton className="w-44 h-4 rounded-md" />
      <Skeleton className="w-32 h-3 rounded-md" />
      <Skeleton className="w-20 h-2 rounded-md" />
    </div>
  </div>
}
