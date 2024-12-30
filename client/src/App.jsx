import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./middleware";

function App() {
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        }
      />
      <Route
        path="signUp"
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
  );
}

export default App;
