import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 default_border">
      <div className=" col-span-4 space-y-">
        <Skeleton className="h-60 w-full rounded-md" />
        <Skeleton className="h-60 w-full rounded-md" />
      </div>

      <div className="col-span-8 space-y-4">
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-full h-5 rounded-md" />
      </div>
    </div>
  );
};

export default SettingsLoading;
