import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return null; // Prevents flashing during check
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
