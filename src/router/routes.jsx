import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Banners from "../pages/Banners";
import Announcements from "../pages/Announcements";
import Agents from "../pages/Agents";
import Affiliates from "../pages/Affiliates";
import PropertyDetail from "../pages/PropertyDetail";
import AgentsDetail from "../pages/AgentsDetail";
import Inquiries from "../pages/Inquiries";

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
        },
        {
            path: "/properties/:id",
            element: <PropertyDetail />,
        },
        {
            path: "/agents/:id",
            element: <AgentsDetail />,
        },
        {
            path: "/inquiries",
            element: <Inquiries />,
        }
    ]);
};

export default AppRoutes;
