import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, UserPlus, Linkedin, Globe, Github } from "lucide-react";
import MessageDialog from "../post/MessageDialog";

export default function AuthorCard() {
  return (
    <div className="xl:block hidden">
      <div className="w-[24rem] mt-10">
        <Card className="w-80 p-4 shadow-lg rounded-2xl text-center bg-white">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-24 h-24 border rounded-full overflow-hidden">
              <img
                src="./author.jpg"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Name & Title */}
          <h2 className="text-xl font-semibold mt-3">Ahmad Fiqri Oemry</h2>
          <p className="text-gray-500">Software Engineer | Web Developer</p>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-center gap-3">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <UserPlus size={16} /> Follow
            </Button>
            <MessageDialog />
          </div>

          {/* Bio */}
          <CardContent className="mt-4 text-sm text-gray-600">
            I Love create seamless & high-performance websites. Lets collaborate
          </CardContent>

          {/* Social Links */}
          <div className="mt-4 flex justify-center gap-4 text-gray-600">
            <a
              href="https://www.linkedin.com/in/ahmadfiqrioemry"
              className="hover:text-blue-600"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/fiqrioemry"
              className="hover:text-pink-600"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.ahmadfiqrioemry.com"
              className="hover:text-gray-800"
            >
              <Globe size={20} />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
