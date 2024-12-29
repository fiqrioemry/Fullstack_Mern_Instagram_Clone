import { Settings } from "lucide-react";
import { Button } from "../components/ui/button";

const Profile = () => {
  return (
    <div className="flex justify-center ">
      <div className="h-screen w-full max-w-4xl py-24 md:py-12">
        {/* head */}
        <div className="flex border-b h-96 ">
          <div className="w-40 md:w-60  flex justify-center">
            <div className="h-24 w-24 md:w-36 md:h-36 flex items-center justify-center border rounded-full">
              <image className="object-contain w-full h-full" src="" alt="" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 max-w-2xl w-full">
              <div>
                <h1 className="text-xl font-semibold">Ahmadfiqri</h1>
              </div>
              <div className="flex items-center gap-4">
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
            <div className="flex">
              <div className="flex items-center gap-8">
                <Button>0 Post</Button>
                <Button>3 Followers</Button>
                <Button>10 Followings</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
