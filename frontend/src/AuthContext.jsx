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
                const decoded = jwtDecode(token); // Decode token
                setUserId(decoded.userId); // ดึง userId
                setIsAuthenticated(true); // ตั้งค่า Auth
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("token"); // ลบ token ที่ไม่ถูกต้อง
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
            setUserId(null);
        }
    }, []);

    console.log("User ID:", userId);


    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,userId }}>{children}</AuthContext.Provider>;
};
