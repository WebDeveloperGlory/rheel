import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Banners from "../pages/Banners";
import Announcements from "../pages/Announcements";
import Agents from "../pages/Agents";
import Affiliates from "../pages/Affiliates";

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
        },
        {
            path: "/agents",
            element: <Agents />,
        },
        {
            path: '/affiliates',
            element: <Affiliates />
        }
    ]);
};

export default AppRoutes;
