import { X } from "lucide-react";
import { useEffect } from "react";
import FollowCard from "./FollowCard";
import NoFollowers from "./NoFollowers";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";

const Followers = () => {
  const { username } = useParams();
  const { getFollowers, follows } = useUserStore();

  useEffect(() => {
    getFollowers(username);
  }, [getFollowers, username]);

  if (!follows) return <FollowLoading />;

  if (follows.length === 0) return <NoFollowers />;

  return (
    <div>
      <div className="flex-center p-4 border-b border-muted relative">
        <h4>Followers</h4>
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

export default Followers;
