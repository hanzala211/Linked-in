import { Skeleton } from "@components"

export const SuggestionsLoader: React.FC = () => {
  return <div className="bg-white flex border-[1px] border-gray-300 pb-4 rounded-lg flex-col gap-12 items-center w-full lg:max-w-[95%] relative h-fit max-w-full">
    <Skeleton className="w-full rounded-t-lg h-14" />
    <Skeleton className="w-14 absolute left-1/2 -translate-x-1/2 top-8 rounded-full h-14" />
    <div className="w-full flex items-center flex-col gap-2">
      <Skeleton className="w-2/3 rounded-lg h-4" />
      <Skeleton className="w-1/2 rounded-lg h-4" />
    </div>
    <Skeleton className="w-[85%] rounded-full h-8" />
  </div>
}