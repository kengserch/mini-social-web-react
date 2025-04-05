import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import { ToastContainer, Flip } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';

import HomeLayout from './layouts/HomeLayout';

function App() {
    const { isAuthenticated, isLoading, hasProfile, isProfileLoading, profileData } = useAuth();

    // useEffect(() => {
    //     console.log("----App.jsx useEffect triggered----");
    //     console.log("isAuthenticated:", isAuthenticated);
    //     console.log("hasProfile:", hasProfile);
    //     console.log("profileData:", profileData)
    // }, [isAuthenticated, hasProfile]);

    if (isLoading || isProfileLoading) {
        return <div className="flex items-center justify-center h-screen"></div>;
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                transition={Flip}
                theme="dark"
            />
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="profile/:id"
                        element={
                            isAuthenticated ? (
                                hasProfile ? (
                                    <Profile />
                                ) : (
                                    <Navigate to="/create-profile" />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="create-profile"
                        element={
                            isAuthenticated ? (
                                hasProfile ? (
                                    <Navigate to="/" />
                                ) : (
                                    <CreateProfile />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Route>
                <Route>
                    <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                    <Route path="register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
