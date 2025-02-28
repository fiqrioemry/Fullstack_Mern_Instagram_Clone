import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col items-center max-w-2xl">
        <div className="flex  md:items-start items-center md:flex-row flex-col  md:gap-8 gap-4">
          <Skeleton className="h-32 w-32 rounded-full flex-shrink-0" />

          <div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-28" />
                <Skeleton className="h-12 w-28" />
              </div>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-6 mt-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-2 mt-4 text-justify">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLoading;
