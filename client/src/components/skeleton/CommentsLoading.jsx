import { Skeleton } from "@/components/ui/skeleton";

const CommentsLoading = () => {
  return (
    <div className="p-3 space-y-6">
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
  );
};

export default CommentsLoading;
