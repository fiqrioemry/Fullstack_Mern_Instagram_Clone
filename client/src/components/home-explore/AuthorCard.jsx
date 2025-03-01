import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Globe, Github } from "lucide-react";

export default function AuthorCard() {
  return (
    <Card className="w-64 lg:w-72  p-4 shadow-lg rounded-2xl text-center bg-white">
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
        <a href="https://github.com/fiqrioemry" className="hover:text-pink-600">
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
  );
}
