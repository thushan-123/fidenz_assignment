import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectPage = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Check if token exists in sessionStorage
        const token = sessionStorage.getItem("token");

        if (token) {
            // Optional: Verify token is valid by making an API call
            // For simplicity, we'll just check if token exists
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Show loading while checking authentication
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectPage;
