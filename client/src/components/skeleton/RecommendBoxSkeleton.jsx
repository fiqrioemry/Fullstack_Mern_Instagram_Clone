import { Skeleton } from "@/components/ui/skeleton";

const RecommendBoxSkeleton = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </div>
        <div>
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default RecommendBoxSkeleton;
