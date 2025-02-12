import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";
import Layout from "./components/layout/Layout";
import { useProvider } from "./context/GlobalProvider";
import DetailPostModal from "./components/modal/DetailPostModal";
import UserPosts from "./components/UserPosts";
import UserTags from "./components/UserTags";
import UserSaved from "./components/UserSaved";
import UserFollowers from "./components/modal/UserFollowers";
import UserFollowings from "./components/modal/UserFollowings";

// support
import { AuthRoute, NonAuthRoute } from "./middleware";
import Testing from "./pages/Testing";
import { Route, Routes, useLocation } from "react-router-dom";
import PostDialog from "./components/PostDialog";

function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* Routes utama */}
      <Routes location={background || location}>
        <Route
          path="/signin"
          element={
            <NonAuthRoute>
              <SignIn />
            </NonAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <NonAuthRoute>
              <SignUp />
            </NonAuthRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="testing" element={<Testing />} />
          <Route path=":username" element={<Profile />}>
            <Route index element={<UserPosts />} />
            <Route path="*" element={<UserPosts />} />
            <Route path="tags" element={<UserTags />} />
            <Route path="saved" element={<UserSaved />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="explore" element={<Explore />} />
          <Route path="p/:id" element={<PostDetails />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path=":username/followers/" element={<UserFollowers />} />
          <Route path=":username/followings/" element={<UserFollowings />} />
          <Route path="/testing/p/:postId" element={<PostDialog />} />
        </Routes>
      )}
    </>
  );
}

export default App;
