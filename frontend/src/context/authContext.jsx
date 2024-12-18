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
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp && decoded.exp > currentTime) {
                    setUser(decoded.userId);
                    setIsAuthenticated(true);
                    checkUserProfile(decoded.userId);
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

    const checkUserProfile = async (userId) => {
        setIsProfileLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/profiles/check/${userId}`);
            setHasProfile(!!response.data.hasProfile);
        } catch (err) {
            console.error("Error checking profile:", err);
            setHasProfile(false);
        } finally {
            setIsProfileLoading(false);
        }
    };

    

    const loginAction = async (inputs) => {
        try {
            const response = await axios.post("http://localhost:8000/api/users/login", inputs);
            if (response.data.status === "ok" && response.data.token) {
                const token = response.data.token;
                setToken(token);
                const decoded = jwtDecode(token);
                setUser(decoded.userId);
                localStorage.setItem("token", token);
                setIsAuthenticated(true);

               
                await checkUserProfile(decoded.userId);

                if (!hasProfile) {
                    navigate("/profile");
                } else {
                    navigate("/");
                }

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
        setHasProfile(false);
        navigate("/");
        console.log("Logged out successfully.");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                user,
                hasProfile,
                loginAction,
                handleLogout,
                isLoading,
                isProfileLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
