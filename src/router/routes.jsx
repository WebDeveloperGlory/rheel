import React, {useEffect} from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Banners from "../pages/Banners";
import Announcements from "../pages/Announcements";
import Agents from "../pages/Agents";
import Affiliates from "../pages/Affiliates";
import PropertyDetail from "../pages/PropertyDetail";
import AgentsDetail from "../pages/AgentsDetail";
import Inquiries from "../pages/Inquiries";
import SignInPage from "../pages/SignIn";

const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top when the path changes
        window.scrollTo(0, 0);
      }, [location.pathname]);

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
        },
        {
            path: "/login",
            element: <SignInPage />
        }
    ]);
};

export default AppRoutes;
