import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthRoute from "./middleware";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailPostModal from "./components/modal/DetailPostModal";
import PostDetails from "./pages/PostDetails";

function App() {
  const location = useLocation();
  const state = location.state || {};

  return (
    <>
      {/* Routes utama */}
      <Routes location={state.background || location}>
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
          <Route path=":username" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="p/:id" element={<PostDetails />} />
        </Route>
      </Routes>
      {state.background && (
        <Routes>
          <Route path="/p/:id" element={<DetailPostModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
