import React, { useEffect } from "react";
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
import Admins from "../pages/Admins";
import ProtectedRoute from "../components/ProtectedRoute"; // Import ProtectedRoute

const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top when the path changes
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return useRoutes([
        {
            path: "/",
            element: <ProtectedRoute element={<Home />} />,
        },
        {
            path: "/properties",
            element: <ProtectedRoute element={<Properties />} />,
        },
        {
            path: "/app-banners",
            element: <ProtectedRoute element={<Banners />} />,
        },
        {
            path: "/announcements",
            element: <ProtectedRoute element={<Announcements />} />,
        },
        {
            path: "/agents",
            element: <ProtectedRoute element={<Agents />} />,
        },
        {
            path: "/affiliates",
            element: <ProtectedRoute element={<Affiliates />} />,
        },
        {
            path: "/properties/:id",
            element: <ProtectedRoute element={<PropertyDetail />} />,
        },
        {
            path: "/agents/:id",
            element: <ProtectedRoute element={<AgentsDetail />} />,
        },
        {
            path: "/inquiries",
            element: <ProtectedRoute element={<Inquiries />} />,
        },
        {
            path: "/login",
            element: <SignInPage />,
        },
        {
            path: "/admins",
            element: <ProtectedRoute element={<Admins />} />
        }
    ]);
};

export default AppRoutes;
