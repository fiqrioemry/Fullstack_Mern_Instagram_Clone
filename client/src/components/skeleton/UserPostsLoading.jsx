import { Skeleton } from "@/components/ui/skeleton";

const UserPostsLoading = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <Skeleton className="h-56 animate-pulse rounded-none" />
      <Skeleton className="h-56 animate-pulse rounded-none" />
      <Skeleton className="h-56 animate-pulse rounded-none" />
      <Skeleton className="h-56 animate-pulse rounded-none" />
      <Skeleton className="h-56 animate-pulse rounded-none" />
      <Skeleton className="h-56 animate-pulse rounded-none" />
    </div>
  );
};

export default UserPostsLoading;
