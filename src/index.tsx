import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Redirect from "./pages/redirect/redirect";
import Homepage from "./pages/landing-pages/homepage/homepage";
import Auth from "./pages/landing-pages/auth/auth";
import Login from "./pages/landing-pages/auth-pages/login/login";
import Signup from "./pages/landing-pages/auth-pages/signup/signup";
import BgDesign from "./layouts/bg-design/bg-design";
import ForgetPassword from "./pages/landing-pages/auth-pages/forget-password/forget-password";
import AppDashboard from "./pages/app-pages/app";
import "./scss/base/_utility.scss";
import "./scss/base/_base.scss";
import Owner from "./pages/owner/owner";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BgDesign />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/features" element={<Homepage />} />
          <Route path="/faq" element={<Homepage />} />
          <Route path="/contact" element={<Homepage />} />
          <Route
            path="*"
            element={<Redirect message="This page does not exist" />}
          />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route
            index
            element={
              <Redirect
                time={5000}
                to="/auth/login"
                message="This page does not exist"
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forget" element={<ForgetPassword />} />
        </Route>
        {/* <Route path="/app" element={<Navigate to="/app/" />} /> */}
        <Route path="/app/" element={<AppDashboard />}>
          <Route path="/app/:path" element={null} />
        </Route>
        <Route path="/owner" element={<Owner />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
