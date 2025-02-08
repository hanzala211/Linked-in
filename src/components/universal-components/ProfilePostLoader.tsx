import { Skeleton } from "@components";

export const ProfilePostLoader: React.FC = () => {
  return (
    <div className="flex flex-col border-[1px] rounded-lg gap-4 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-32 h-6 rounded-md" />
      </div>
      <Skeleton className="w-full lg:h-96 h-80 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="w-[30%] h-4 rounded-md" />
        <Skeleton className="w-[30%] h-4 rounded-md" />
        <Skeleton className="w-[30%] h-4 rounded-md" />
      </div>
    </div>
  );
};
