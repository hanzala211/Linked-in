import { Skeleton } from "@components";

export const JobListingSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-6 ">
      {/* Company Info */}
      <div className="flex items-center space-x-4">
        <Skeleton className="w-10 h-10 " />
        <div className="space-y-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>

      {/* Job Title */}
      <Skeleton className="w-3/4 h-6" />

      {/* Location & Applicants */}
      <div className="flex space-x-2">
        <Skeleton className="w-52 h-4" />
        <Skeleton className="w-24 h-4" />
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <Skeleton className="w-24 h-8 rounded-full" />
        <Skeleton className="w-16 h-8 rounded-full" />
      </div>

      {/* Hiring Team */}
      <div className="border rounded-lg p-5">
        <Skeleton className="w-32 h-5" />
        <div className="flex items-center space-x-4 mt-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-2 mt-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  );
}