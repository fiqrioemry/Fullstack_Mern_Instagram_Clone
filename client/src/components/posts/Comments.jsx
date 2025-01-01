/* eslint-disable react/prop-types */
import UserAvatar from "../Avatar";
import Timestamp from "../Timestamp";
import { Ellipsis, Heart } from "lucide-react";
import MoreOptions from "../modal/MoreOptions";
import { ModalContainer } from "../modal/ModalContainer";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <div className="py-2" key={comment.commentId}>
          <div className="flex min-h-12 ">
            <div className="flex gap-x-4">
              <UserAvatar user={comment} />
              <div className="text-sm space-y-2">
                <div className="font-medium">{comment.username}</div>
                <div className="text-justify">{comment.content}</div>
                <Timestamp createdAt={comment.createdAt} />
              </div>
            </div>

            <div>
              <ModalContainer
                title={<Heart size={14} />}
                tooltip="more options"
              >
                <MoreOptions />
              </ModalContainer>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Comments;
