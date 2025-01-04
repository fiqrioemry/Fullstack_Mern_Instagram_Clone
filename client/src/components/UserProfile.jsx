/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

const UserProfile = ({ user, data }) => {
  const navigate = useNavigate();
  const { setMount } = useProvider();

  const handleNavigate = () => {
    setMount(true);
    navigate(`/${user.username}/followers/`);
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
            <div className="flex items-center gap-2 col-span-3 md:col-span-2">
              <Button variant="custom" size="md">
                Follow
              </Button>
              <Button variant="primary" size="md">
                Message
              </Button>
              <Button variant="primary" size="md">
                <Settings />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <div>{user.posts} Post</div>
            {data.username === user.username ? (
              <Button onClick={handleNavigate}>
                <div>{user.followers} Edit Profile</div>
              </Button>
            ) : (
              <Button onClick={handleNavigate}>
                <div>{user.followers} Followers</div>
              </Button>
            )}

            <Link to={`/${user.username}/followings`}>
              <div>{user.followings} Followings</div>
            </Link>
          </div>

          <div className="space-y-6">
            <div>{user.fullname}</div>
            <div>{user.bio}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
