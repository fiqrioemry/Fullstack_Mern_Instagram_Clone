/* eslint-disable react/prop-types */
import { Bookmark, Grid2X2, Tags } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NavTabs = ({ profile }) => {
  const location = useLocation();
  return (
    <Tabs defaultValue={location.pathname}>
      <TabsList className="w-full mb-6">
        <Link to={`/${profile.username}`}>
          <TabsTrigger value={`/${profile.username}`}>
            <Grid2X2 /> <span>Post</span>
          </TabsTrigger>
        </Link>
        {profile.isMyProfile && (
          <Link to="saved">
            <TabsTrigger value="saved">
              <Bookmark /> <span>Saved</span>
            </TabsTrigger>
          </Link>
        )}

        <Link to="tags">
          <TabsTrigger value="tags">
            <Tags /> <span>tags</span>
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default NavTabs;
