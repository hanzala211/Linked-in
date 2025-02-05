import { Skeleton } from "@components"

export const PostLoader: React.FC = () => {
  return <div className="bg-white rounded-lg px-4 py-2">
    <div className="flex gap-3 items-center">
      <Skeleton className="w-11 h-11 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-32 h-3 rounded-md" />
        <Skeleton className="w-24 h-2 rounded-md" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mt-4 rounded-md" />
    <div className="mt-4">
      <Skeleton className="w-full rounded-lg h-[30rem]" />
    </div>
    <div className="mt-4 flex justify-between mx-5">
      <Skeleton className="w-28 rounded-lg h-7" />
      <Skeleton className="w-28 rounded-lg h-7" />
      <Skeleton className="w-28 rounded-lg h-7" />
    </div>
  </div>
}