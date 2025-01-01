/* eslint-disable react/prop-types */
import UserAvatar from "../Avatar";
import Timestamp from "../Timestamp";
import { Ellipsis } from "lucide-react";
import MoreOptions from "../modal/MoreOptions";
import { ModalContainer } from "../modal/ModalContainer";

const Caption = ({ user, content = null }) => {
  return (
    <div className="py-2">
      <div className="flex min-h-12 ">
        <div className="flex gap-x-4">
          <UserAvatar user={user} />
          <div className="text-sm space-y-2">
            <div className="font-medium">{user.username}</div>
            {content && (
              <div>
                <div className="text-justify">{content}</div>
                <Timestamp createdAt={user.createdAt} />
              </div>
            )}
          </div>
        </div>

        <div>
          <ModalContainer title={<Ellipsis />} tooltip="more options">
            <MoreOptions />
          </ModalContainer>
        </div>
      </div>
    </div>
  );
};

export default Caption;
