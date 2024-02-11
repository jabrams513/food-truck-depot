import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import "./index.css";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AddTruck from "./pages/AddTruck/AddTruck.jsx";
import Reservations from "./pages/Reservations/Reservations.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addTruck",
        element: <AddTruck />,
      },
      {
        path: "/Reservations",
        element: <Reservations />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
