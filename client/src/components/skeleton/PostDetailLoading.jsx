import { Skeleton } from "@/components/ui/skeleton";

const PostDetailLoading = () => {
  return (
    <div className="h-screen flex items-center mx-4 md:mx-8">
      <div className="h-[90vh] w-full flex md:flex-row flex-col gap-4">
        <div className="w-full md:w-1/2">
          <Skeleton className="h-72 md:h-full w-full" />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full " />
            <Skeleton className="flex-1 h-4" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 mt-8">
            <Skeleton className="h-12 w-full " />
            <Skeleton className="h-12 w-full " />
            <Skeleton className="h-12 w-full " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailLoading;
