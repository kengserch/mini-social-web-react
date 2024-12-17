import { Routes, Route, Navigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import HomeLayout from "./layouts/HomeLayout";

function App() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    
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
