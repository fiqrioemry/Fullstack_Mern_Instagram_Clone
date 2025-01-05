/* eslint-disable react/prop-types */
import UserAvatar from "../Avatar";
import Timestamp from "../Timestamp";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const Caption = ({ user }) => {
  return (
    <div className="py-2">
      <div className="flex">
        <div className="flex w-full gap-x-3 ">
          <UserAvatar user={user} />
          <div className="text-sm space-y-2">
            <div className="font-medium">{user.username}</div>
            <div className="text-justify">{user.content}</div>
            <div className="text-xs">
              <div className="flex items-center gap-x-3">
                <Timestamp createdAt={user.createdAt} />
                <div>
                  {user.likeCount !== 0 && (
                    <Button>{user.likeCount} Likes</Button>
                  )}
                </div>
                <div>
                  <Button>Reply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4">
          <button>
            <Heart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Caption;
