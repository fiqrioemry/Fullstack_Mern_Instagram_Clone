import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center max-w-3xl px-8 md:px-12 py-8 md:py-12 ">
          <div className="h-screen w-full space-y-6">
            <div className="space-y-2">
              <div className="py-2">
                <label className="px-2 text-lg font-semibold">Profile</label>
              </div>
              <div className="p-6 flex gap-8 border rounded-lg">
                <div className="w-28 h-28 rounded-full border bg-white"></div>
                <div className="space-y-3">
                  <h2 className=" text-xl font-semibold">ahmadfiqri95</h2>
                  <Button variant="custom" size="md">
                    Change photo
                  </Button>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Fullname</label>
                <Input
                  className="bg-background"
                  value="Ahmad fiqri oemry"
                  placeholder=""
                />
              </div>

              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Bio</label>
                <Textarea
                  className="w-full py-2 text-sm bg-background resize-none focus:outline-none overflow-y-scroll no-scrollbar"
                  placeholder=""
                />
              </div>

              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Gender</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end py-3">
                <Button variant="custom" size="md">
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
