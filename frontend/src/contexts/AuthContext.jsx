import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import axios from 'axios';
import AxiosInstance from '../utils/AxiosInstance';
import { API_BASE_URL } from '../config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        setToken('');
        setHasProfile(false);
        console.log('Logged out successfully.');
    };

    const setTokenExpiryTimer = (expiryTime) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = expiryTime - currentTime;

        if (timeLeft > 0) {
            setTimeout(() => {
                alert('Token expired, logging out');
                console.log('Token expired, logging out.');
                handleLogout();
            }, timeLeft * 1000); // แปลงวินาทีเป็นมิลลิวินาที
        } else {
            handleLogout();
        }
    };

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.userId);
                setIsAuthenticated(true);
                fetchProfile(decoded.userId);
                setTokenExpiryTimer(decoded.exp);
            } catch (error) {
                console.error('Invalid token:', error);
                handleLogout();
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [token]);

    

    const loginAction = async (inputs) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, inputs);
            if (response.data.status === 'ok' && response.data.token) {
                const token = response.data.token;
                setToken(token);
                const decoded = jwtDecode(token);
                setUser(decoded.userId);
                localStorage.setItem('token', token);
                setIsAuthenticated(true);

                await fetchProfile(decoded.userId);
                if (hasProfile) {
                    navigate('/');
                } else {
                    navigate('/create-profile');
                }
                console.log('Logged in successfully.');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed. Please try again later.');
        }
    };

    const fetchProfile = async (userId) => {
        setIsProfileLoading(true);
        try {
            const response = await AxiosInstance.get(`/profiles/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.profile) {
                setProfileData(response.data.profile);
                setHasProfile(true);
            } else {
                setProfileData(null);
                setHasProfile(false);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            //console.error(error.response.data.message);
            setProfileData(null);
            setHasProfile(false);
        } finally {
            setIsProfileLoading(false);
        }
    };

    const fetchProfileById = async (userId) => {
        try {
            const response = await AxiosInstance.get(`/profiles/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.profile) {
                return response.data.profile;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching profile by ID:', error);
            return null;
        }
    };

    // useEffect(() => {
    //     AxiosInstance.interceptors.response.use(
    //         (response) => response,
    //         (error) => {
    //             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //                 console.log('Token expired or unauthorized, logging out.');
    //                 handleLogout(); // Logout ผู้ใช้งาน
    //                 alert('Session expired. Please log in again.');
    //             }
    //             return Promise.reject(error);
    //         }
    //     );
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                loginAction,
                handleLogout,
                hasProfile,
                profileData,
                isLoading,
                isProfileLoading,
                fetchProfileById,
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
