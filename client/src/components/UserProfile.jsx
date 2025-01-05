/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

const UserProfile = ({ user, data }) => {
  const navigate = useNavigate();
  const { setMount, setBackground } = useProvider();

  const handleNavigate = (path) => {
    setMount(true);
    setBackground(`/${user.username}`);
    navigate(`/${user.username}${path}`);
  };

  return (
    <div className="grid grid-cols-3 h-60">
      <div className="flex justify-center col-span-1">
        <div className="h-24 w-24 md:w-36 md:h-36 border rounded-full">
          <img src={user.avatar} alt="user_avatar" />
        </div>
      </div>
      <div className="col-span-2">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-xl font-semibold col-span-1">
              {user.username}
            </div>

            {data.username === user.username ? (
              <div className="flex items-center gap-2 col-span-3 md:col-span-2">
                <Button variant="primary" size="md">
                  <div>Edit Profile</div>
                </Button>
                <Button variant="primary" size="md">
                  View Archieve
                </Button>
                <Button variant="primary" size="md">
                  <Settings />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 col-span-3 md:col-span-2">
                <Button variant="custom" size="md" onClick={handleNavigate}>
                  <div>Follow</div>
                </Button>
                <Button variant="primary" size="md">
                  Message
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-x-6 text-md">
            <div>{user.posts} Post</div>
            <Button onClick={() => handleNavigate("/followers/")}>
              {user.followers} Followers
            </Button>
            <Button onClick={() => handleNavigate("/followings/")}>
              {user.followings} Followings
            </Button>
          </div>

          <div className="space-y-6">
            <div>{user.bio}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
