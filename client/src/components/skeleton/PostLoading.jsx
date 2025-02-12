import { Skeleton } from "@/components/ui/skeleton";

const PostLoading = () => {
  return (
    <div className="border border-muted-foreground/25">
      <div className="grid grid-cols-10 h-[550px]">
        <Skeleton className="h-full col-span-6 rounded-none" />
        <div className="p-3 space-y-6 col-span-4">
          <div className="flex items-center gap-x-4 mb-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-1/3 rounded-full" />
          </div>

          {[...Array(5)].map((_, index) => (
            <div className="flex items-center w-full gap-x-4" key={index}>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 w-3/4">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-1/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
