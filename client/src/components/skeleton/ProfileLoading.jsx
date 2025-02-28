import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <>
      <div className="flex justify-center md:items-start items-center md:flex-row flex-col md:gap-8 gap-4 w-full pt-10">
        <Skeleton className="h-32 w-32 rounded-full flex-shrink-0" />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLoading;
