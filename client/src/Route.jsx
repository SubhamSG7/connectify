import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Wrapper from "./Components/Wrapper";
import HomePage from "./Components/HomePage";
import ValidateOTP from "./Components/ValidateOTP";
import Global from "./Components/Global";
import Private from "./Components/Private";
import Profile from "./Pages/Profile";
import About from "./Components/About";
import PrivateRoute from "./Components/PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "validateotp",
        element: <ValidateOTP />,
      },
      {
        path: "global",
        element: (
          <PrivateRoute>
            <Global />
          </PrivateRoute>
        ),
      },
      {
        path: "private",
        element: (
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
