/* eslint-disable react/prop-types */
import UserAvatar from "../Avatar";
import Timestamp from "../Timestamp";
import { Ellipsis, Heart } from "lucide-react";
import MoreOptions from "../modal/MoreOptions";
import { ModalContainer } from "../modal/ModalContainer";

const Caption = ({ user, content }) => {
  return (
    <div className="space-y-10">
      <div className="flex min-h-12 ">
        <div className="flex gap-x-4">
          <UserAvatar user={user} />
          <div className="text-sm space-y-2">
            <div className="font-medium">{user.username}</div>
            <div className="text-justify">{user.content}</div>
            <Timestamp createdAt={user.createdAt} />
          </div>
        </div>

        <div>
          <ModalContainer title={<Heart size={14} />} tooltip="more options">
            <MoreOptions />
          </ModalContainer>
        </div>
      </div>
    </div>
  );
};

export default Caption;
