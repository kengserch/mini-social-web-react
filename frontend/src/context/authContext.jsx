import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp && decoded.exp > currentTime) {
                    setUser(decoded.userId);
                    setIsAuthenticated(true);
                } else {
                    console.log("Token expired!");
                    handleLogout();
                }
            } catch (error) {
                console.error("Invalid token:", error); // เพิ่ม log
                handleLogout();
            } finally {
                setIsLoading(false); // การโหลดเสร็จในทุกกรณี
            }
        } else {
            setIsLoading(false); // กรณีไม่มี token
        }
    }, []);

    const loginAction = async (inputs) => {
        try {
            const response = await axios.post("http://localhost:8000/api/users/login", inputs);
            if (response.data.status === "ok" && response.data.token) {
                const token = response.data.token; // ดึง token จาก response.data
                setToken(token); // ตั้งค่า token ใน state
                const decoded = jwtDecode(token); // ถอดรหัส token
                setUser(decoded.userId); // ตั้งค่า userId จาก token ที่ถอดรหัสแล้ว
                localStorage.setItem("token", token); // เก็บ token ใน localStorage
                setIsAuthenticated(true); // ตั้งค่าสถานะว่า authenticated
                navigate("/");
                console.log("Logged in successfully.");
            } else {
                console.log("Login failed");
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials or try again later.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setToken("");
        navigate("/");
        console.log("Logged out successfully.");
    };

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, user, loginAction, handleLogout, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
