import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useHandleForm } from "../hooks/useHandleForm";
import { initialProfileForm } from "../config";

const Settings = () => {
  const { formData, handleChange, handleValidate } =
    useHandleForm(initialProfileForm);

  const isValid = handleValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center max-w-3xl px-6 mt-20 md:mt-10 mb-20">
          <div className="w-full space-y-6">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Fullname</label>
                <Input
                  className="bg-background"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full py-2 text-sm bg-background resize-none focus:outline-none overflow-y-scroll no-scrollbar"
                  placeholder="Write your bio here ..."
                />
              </div>

              <div className="space-y-2">
                <label className="px-2 text-lg font-semibold">Gender</label>
                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "gender", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
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
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="custom"
                  size="md"
                >
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
