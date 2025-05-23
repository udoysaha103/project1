import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Profile from "./pages/Profile/Profile";
import AddKOL from "./pages/AddKOL/AddKOL";
import FAQ from "./pages/FAQ/FAQ";
import TermsOfUse from "./pages/Policy/TermsOfUse";
import PrivacyPolicies from "./pages/Policy/PrivacyPolicies";
import MemeBubble from "./pages/MemeBubble/MemeBubble";
import ResetPassword from "./pages/Authentication/ResetPassword";
import EmailInput from "./pages/Authentication/EmailInput";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

import { useAuthContext } from "./hooks/useAuthContext";
import { useSSOLogin } from "./hooks/useSSOLogin";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const { user } = useAuthContext();
  const { ssoLogin, isLoading, error } = useSSOLogin();
  useEffect(() => {
    if (Cookies.get("session") && Cookies.get("session").length > 6 && Cookies.get("session.sig")) {
      ssoLogin();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/add-kol" element={<AddKOL />}></Route>
        <Route path="/memebubbles" element={<MemeBubble />}></Route>
        <Route path="/FAQ" element={<FAQ />}></Route>
        <Route path="/termsofuse" element={<TermsOfUse />}></Route>
        <Route path="/privacypolicies" element={<PrivacyPolicies />}></Route>
        <Route path="/forgotpassword" element={<EmailInput />}></Route>
        <Route
          path="/forgotpassword/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/edit" element={<AdminPanel />}></Route>
      </Routes>
    </>
  );
};

export default App;
