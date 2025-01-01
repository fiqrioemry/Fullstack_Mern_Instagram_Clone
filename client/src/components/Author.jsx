/* eslint-disable react/prop-types */
import UserAvatar from "./Avatar";
import Timestamp from "./Timestamp";
import { Ellipsis } from "lucide-react";
import MoreOptions from "./modal/MoreOptions";
import { ModalContainer } from "./modal/ModalContainer";

const Author = ({ user }) => {
  return (
    <div>
      <div className="flex">
        <div className="flex w-full gap-x-3 ">
          <UserAvatar user={user} />
          <div className="text-sm space-y-2">
            <div className="font-medium">{user.username}</div>
            <div className="flex items-center gap-x-2">
              <Timestamp createdAt={user.createdAt} />
            </div>
          </div>
        </div>
        <div className="w-4">
          <ModalContainer title={<Ellipsis size={14} />} tooltip="more options">
            <MoreOptions />
          </ModalContainer>
        </div>
      </div>
    </div>
  );
};

export default Author;
