import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import HomeLayout from "./layouts/HomeLayout";

const PrivateRoute = ({ children, hasProfile }) => {
    const { isAuthenticated, isProfileLoading } = useAuth();

    if (isProfileLoading) {
        return <div>Loading...</div>; // หรือ Spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!hasProfile) {
        return <Navigate to="/profile" />;
    }

    return children;
};

function App() {
    const { isAuthenticated, isLoading, hasProfile, isProfileLoading } = useAuth();

    // useEffect(() => {
    //     console.log("App.jsx useEffect triggered");
    //     console.log("isAuthenticated:", isAuthenticated);
    //     console.log("isLoading:", isLoading);
    // }, [isAuthenticated, isLoading]);

    if (isLoading || isProfileLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route
                    index
                    element={
                        <PrivateRoute hasProfile={hasProfile}>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <PrivateRoute hasProfile={true}>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route>
                <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            </Route>
        </Routes>
    );
}

export default App;
