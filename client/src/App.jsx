import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
