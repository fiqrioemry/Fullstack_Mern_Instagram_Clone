/* eslint-disable react/prop-types */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ like }) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3 py-3">
          <Button onClick={() => setIsLike(!isLike)}>
            <Heart
              className={cn(
                "duration-300 transition-all",
                !isLike && "text-red-500 fill-red-500"
              )}
            />
          </Button>
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />
      </div>
      {like !== 0 && <div className="text-sm">{like} Likes</div>}
    </div>
  );
};

export default PostControl;
