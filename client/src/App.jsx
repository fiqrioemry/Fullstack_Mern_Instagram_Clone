import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthRoute from "./middleware";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";
import Layout from "./components/layout/Layout";
import { useProvider } from "./context/GlobalProvider";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailPostModal from "./components/modal/DetailPostModal";
import UserPosts from "./components/UserPosts";
import UserTags from "./components/UserTags";
import UserSaved from "./components/UserSaved";

function App() {
  const location = useLocation();
  const { background } = useProvider();

  return (
    <>
      {/* Routes utama */}
      <Routes location={background || location}>
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
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
          <Route path=":username/*" element={<Profile />}>
            <Route index element={<UserPosts />} />
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
          <Route path="p/:id" element={<DetailPostModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
