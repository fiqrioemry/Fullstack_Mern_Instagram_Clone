/* eslint-disable react/prop-types */
import Content from "./Content";
import LikeComment from "./LikeComment";
import Avatar from "@/components/ui/Avatar";
import LikeCount from "@/components/post/LikeCount";
import Timestamp from "@/components/post/Timestamp";
import ReplyButton from "@/components/post/ReplyButton";

const Replies = ({ replies }) => {
  console.log(replies);
  return (
    <div className="mt-2">
      {replies.map((reply) => (
        <div key={reply.replyId} className="py-1.5">
          <div className="flex space-x-3">
            <Avatar avatar={reply.avatar} />
            <div>
              <Content data={reply} />
              <div className="text-xs flex items-center space-x-2">
                <Timestamp data={reply} />
                <LikeCount data={reply} />
                <LikeComment data={reply} />
                <ReplyButton data={reply} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
