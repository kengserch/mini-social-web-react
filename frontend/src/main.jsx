import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
    </StrictMode>
);
