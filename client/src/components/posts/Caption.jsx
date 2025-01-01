/* eslint-disable react/prop-types */
import UserAvatar from "../Avatar";
import Timestamp from "../Timestamp";
import { Ellipsis } from "lucide-react";
import MoreOptions from "../modal/MoreOptions";
import { ModalContainer } from "../modal/ModalContainer";

const Caption = ({ user, content }) => {
  return (
    <div className="grid grid-cols-12 gap-x-2">
      <div className="col-span-2 flex justify-center">
        <UserAvatar user={user} />
      </div>
      <div className="col-span-9 text-sm space-y-2">
        <span className="font-medium">{user.username}</span>
        {content && (
          <div>
            <p className="text-justify">{user.content}</p>
            <Timestamp createdAt={user.createdAt} />
          </div>
        )}
      </div>
      <div className="col-span-1">
        {!content && (
          <ModalContainer title={<Ellipsis />}>
            <MoreOptions />
          </ModalContainer>
        )}
      </div>
    </div>
  );
};

export default Caption;
