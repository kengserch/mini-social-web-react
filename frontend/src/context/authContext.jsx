import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
import { jwtDecode } from "jwt-decode";
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp && decoded.exp < currentTime) {
                    console.log("Token expired!");
                    handleLogout();
                } else {
                    setUserId(decoded.userId);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                handleLogout();
            }
        } else {
            setIsAuthenticated(false);
            setUserId(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserId(null);
        console.log("Logged out successfully.");
    };

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, handleLogout }}>{children}</AuthContext.Provider>;
};
