import { Skeleton } from "@/components/ui/skeleton";
const ProfileSkeleton = () => {
  return (
    <div className="flex h-60">
      <div className="w-40 md:w-60 flex justify-center">
        <Skeleton className="h-24 w-24 md:w-36 md:h-36 rounded-full" />
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-24" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
