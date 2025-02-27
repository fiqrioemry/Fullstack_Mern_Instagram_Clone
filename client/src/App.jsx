import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import PostDetail from "./pages/PostDetail";
import Notifications from "./pages/Notifications";
import SettingsLayout from "./pages/SettingsLayout";

import Layout from "./components/layout/Layout";
import UserTags from "./components/profile/UserTags";
import UserPosts from "./components/profile/UserPosts";
import UserSaved from "./components/profile/UserSaved";
import PostDialog from "./components/modal/PostDialog";
import Followers from "./components/profile/Followers";
import Followings from "./components/profile/Followings";
import PageLoading from "@/components/skeleton/PageLoading";

import { Route, Routes } from "react-router-dom";
import useAuthChecking from "./hooks/useAuthChecking";
import { AuthRoute, NonAuthRoute } from "./middleware";

function App() {
  const { checkingAuth, location, background } = useAuthChecking();

  if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
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
          <Route path="p/:id" element={<PostDetail />} />
          <Route path=":username" element={<Profile />}>
            <Route index element={<UserPosts />} />
            <Route path="tags" element={<UserTags />} />
            <Route path="saved" element={<UserSaved />} />
          </Route>
          <Route path="settings" element={<SettingsLayout />} />
          <Route path="message" element={<Messages />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path=":username/followings" element={<Followings />} />
          <Route path=":username/followers" element={<Followers />} />
          <Route path="p/:id" element={<PostDialog />} />
        </Routes>
      )}
    </>
  );
}

export default App;
