import { Skeleton } from "@/components/ui/skeleton";

const ChatListLoading = () => {
  return (
    <div>
      <div className="flex-1 px-2 py-4 space-y-4 ">
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ChatListLoading;
