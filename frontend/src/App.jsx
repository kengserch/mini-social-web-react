import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import HomeLayout from "./layouts/HomeLayout";

function App() {
    const { isAuthenticated, isLoading } = useAuth();

    // useEffect(() => {
    //     console.log("App.jsx useEffect triggered");
    //     console.log("isAuthenticated:", isAuthenticated);
    //     console.log("isLoading:", isLoading);
    // }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
            </Route>

            <Route>
                <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            </Route>
        </Routes>
    );
}

export default App;
