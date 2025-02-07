import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Banners from "../pages/Banners";
import Announcements from "../pages/Announcements";

const AppRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/properties",
            element: <Properties />,
        },
        {
            path: "/app-banners",
            element: <Banners />,
        },
        {
            path: "/announcements",
            element: <Announcements />,
        }
    ]);
};

export default AppRoutes;
