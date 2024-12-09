import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Wrapper from "./Components/Wrapper";
import HomePage from "./Components/HomePage";
import ValidateOTP from "./Components/ValidateOTP";
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
    ],
  },
]);
