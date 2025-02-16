/* eslint-disable react/prop-types */

import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const UserProfile = ({ profile }) => {
  const location = useLocation();

  return (
    <div className="py-10">
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-2xl">
          <div className="flex  md:items-start items-center md:flex-row flex-col  md:gap-8 gap-2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 flex-shrink-0">
              <Image url={profile.avatar} />
            </div>

            <div>
              <div className="flex flex-col md:flex-row items-center gap-4 ">
                <div className="flex justify-center md:justify-start w-full md:w-1/3">
                  <h3>{profile.username}</h3>
                </div>

                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <Button className="w-full" variant="following">
                    Edit Profile
                  </Button>
                  <Button className="w-full" variant="following">
                    View Archive
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-6 mt-4">
                <span>{profile.posts} Posts</span>
                <Link
                  className="hover-btn"
                  to={`/${profile.username}/followings`}
                  state={{ background: location }}
                >
                  {profile.followings} Followings
                </Link>
                <Link
                  className="hover-btn"
                  to={`/${profile.username}/followers`}
                  state={{ background: location }}
                >
                  {profile.followers} Followers
                </Link>
              </div>
              <div className="space-y-2 mt-4 text-justify">
                <span className="text-gray-500">{profile.fullname}</span>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore sapiente commodi est deserunt quasi iusto, molestiae,
                  fuga labore optio qui ipsam ducimus accusamus eum minima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
