import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Banners from "../pages/Banners";
import Announcements from "../pages/Announcements";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/properties",
        element: <Properties />,
    },
    {
        path: "/banners",
        element: <Banners />
    },
    {
        path: "/announcements",
        element: <Announcements />
    }
]);

export default function Routes() {
    return <RouterProvider router={ router } />;
}