import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/properties",
        element: <Properties />,
    },
]);

export default function Routes() {
    return <RouterProvider router={ router } />;
}