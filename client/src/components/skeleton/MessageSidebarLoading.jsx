import { Skeleton } from "@/components/ui/skeleton";

const MessageSidebarLoading = () => {
  return (
    <aside className="h-full w-20 md:w-60 lg:w-72">
      <div className="p-2 border-r border-base-300">
        <div className="mt-4 py-4 border-b border-muted-foreground/60">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
            <div>
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto py-4">
          {[
            ...Array(4).map((_, index) => (
              <div className="flex items-center gap-4" key={index}>
                <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
                <div>
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                </div>
              </div>
            )),
          ]}
        </div>
      </div>
    </aside>
  );
};

export default MessageSidebarLoading;
