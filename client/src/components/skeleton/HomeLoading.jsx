import PostsLoading from "./PostsLoading";
import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => {
  return (
    <div className="min-h-screen">
      <div className="flex px-2 md:px-10 py-[3rem] md:py-[1rem] mb-8">
        <div className="md:w-7/12 px-4 md:px-2 space-y-2">
          <PostsLoading />
        </div>

        {/* author card */}
        <div className="w-5/12 hidden md:block">
          <div className="flex justify-center py-4">
            <Skeleton className="w-80 h-80 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
