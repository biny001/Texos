import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import AppLayout from "./ui/AppLayout";
import SignUpForm from "./Auth/SignUpForm";
import SignInForm from "./Auth/SignInForm";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import Edit from "./Pages/Edit";
import Saved from "./Pages/Saved";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* AuthRoute */}
        <Route element={<AuthLayout />}>
          <Route
            element={<SignUpForm />}
            path="/sign-up"
          />
          <Route
            element={<SignInForm />}
            path="/sign-in"
          />
        </Route>
        {/* AppRoute */}
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/post"
            element={<Post />}
          />
          <Route
            path="/saved"
            element={<Saved />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/edit:id"
            element={<Edit />}
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
