import { X } from "lucide-react";
import { useEffect } from "react";
import FollowCard from "./FollowCard";
import NoFollowings from "./NoFollowings";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";

const Followings = () => {
  const { username } = useParams();
  const { getFollowings, follows } = useUserStore();

  useEffect(() => {
    getFollowings(username);
  }, [getFollowings, username]);

  if (!follows) return <FollowLoading />;

  if (follows.length === 0) return <NoFollowings />;

  return (
    <div>
      <div className="flex-center p-4 border-b border-muted relative">
        <h4>Followings</h4>
        <DialogClose className="absolute right-3">
          <X size={24} />
        </DialogClose>
      </div>

      <ScrollArea className="h-80 overflow-y-auto">
        {follows.map((user) => (
          <FollowCard data={user} key={user.userId} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default Followings;
