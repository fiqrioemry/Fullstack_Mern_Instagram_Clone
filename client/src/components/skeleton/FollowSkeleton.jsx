import { Skeleton } from "@/components/ui/skeleton";

const FollowSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-12 w-12 rounded-full" />

      <div className="space-y-3">
        <Skeleton className="h-3 w-40 rounded-md" />
        <Skeleton className="h-3 w-40 rounded-md" />
      </div>
      <Skeleton className="h-9 w-24 col-span-3 rounded-md" />
    </div>
  );
};

export default FollowSkeleton;
