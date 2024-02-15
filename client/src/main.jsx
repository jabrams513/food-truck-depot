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
import Map from "./pages/Map/Map.jsx";
import Italian from "./pages/Categories/italian.jsx";
import Mexican from "./pages/Categories/Mexican.jsx";
import Asian from "./pages/Categories/asian.jsx";
import Healthy from "./pages/Categories/healthy.jsx";
import Mediterranean from "./pages/Categories/Mediterranean.jsx";
import Beverage from "./pages/Categories/beverage.jsx";
import American from "./pages/Categories/american.jsx";
import FoodTruckPage from "./pages/FoodTrucks/FoodTruckTemplate.jsx";
import Category from "./pages/Categories/category.jsx";

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
      },
      {
        path: "/Map",
        element: <Map />,
      },
      {
        path: "/:categoryName",
        element: <Category />,
      },
      {
        path: "/food-truck/:truckId",
        element: <FoodTruckPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
