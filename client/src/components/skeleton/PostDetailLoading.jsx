import { Skeleton } from "@/components/ui/skeleton";

const PostDetailLoading = () => {
  return (
    <div className="h-screen w-full flex md:flex-row flex-col py-8 mx-4 md:mx-8 lg:mx-12 space-x-0 md:space-x-4 mdLspace-y-0 space-y-8">
      <div className="w-full md:w-1/2">
        <Skeleton className="h-72 md:h-full w-full" />
      </div>

      <div className="flex flex-col space-y-8 w-full md:w-1/2">
        <Skeleton className="h-12 w-full " />

        <div className="flex-1 overflow-y-auto py-4 space-y-8">
          <Skeleton className="h-12 w-full " />
          <Skeleton className="h-12 w-full " />
          <Skeleton className="h-12 w-full " />
        </div>

        <Skeleton className="h-12 w-full " />
        <Skeleton className="h-12 w-full " />
      </div>
    </div>
  );
};

export default PostDetailLoading;
