import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center max-w-3xl px-8 md:px-12 py-8 md:py-12 ">
          <div className="h-screen w-full space-y-3">
            <div>
              <div className="p-3">
                <h3 className="text-xl font-semibold">Profile</h3>
              </div>
              <div className="p-6 flex gap-8 border bg-accent rounded-lg">
                <div className="w-28 h-28 rounded-full border bg-white"></div>
                <div className="space-y-3">
                  <h2 className=" text-xl font-semibold">ahmadfiqri95</h2>
                  <Button variant="custom" size="md">
                    Change photos
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="p-3">
                <h3 className="text-xl font-semibold">Fullname</h3>
              </div>
              <div className="flex">
                <Input
                  className="bg-background"
                  value="ahmad fiqri oemry"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <div className="p-3">
                <h3 className="text-xl font-semibold">Bio</h3>
              </div>
              <div className="flex">
                <Textarea
                  className="w-full py-2 text-sm bg-background resize-none focus:outline-none overflow-y-scroll no-scrollbar"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <div className="p-3">
                <h3 className="text-xl font-semibold">Gender</h3>
              </div>
              <div className="flex">
                <Input
                  className="bg-background"
                  value="ahmad fiqri oemry"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
