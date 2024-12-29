import { Button } from "../components/ui/button";

const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="h-screen w-full flex justify-center max-w-[58rem]">
        {/* head */}
        <div className="bg-red-500 py-12">
          <div className="flex gap-4">
            <div className="w-56 h-56">
              <div className="w-40 h-40 bg-red-500 rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">John doe</h1>
                <div className="space-x-4">
                  <Button variant="custom" size="md">
                    Follow
                  </Button>
                  <Button variant="primary" size="md">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
