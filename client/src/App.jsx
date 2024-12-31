import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthRoute from "./middleware";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import DetailPostModal from "./components/modal/DetailPostModal";

function App() {
  const location = useLocation();
  const state = location.state || {};

  return (
    <>
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
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Render modal only if background location exists */}
      {state.background ? (
        <Routes>
          <Route path="/p/:id" element={<DetailPostModal />} />
        </Routes>
      ) : (
        location.pathname.startsWith("/p/") && <Navigate to="/" />
      )}
    </>
  );
}

export default App;
