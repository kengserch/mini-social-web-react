import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./layouts/HomeLayout";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route index element={<Home />} />
                </Route>

                <Route>
                    <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                    <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
