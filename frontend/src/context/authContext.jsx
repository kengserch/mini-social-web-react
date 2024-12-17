import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState();
    const [isLoading, setIsLoading] = useState(true); // ตรวจสอบสถานะการโหลด

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
        setIsLoading(false); // การโหลดเสร็จ
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserId(null);
        console.log("Logged out successfully.");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
