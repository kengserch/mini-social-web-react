import React, { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { AuthContext } from "../AuthContext";


const Header = () => {
    const [isLoginOpen, setLoginIsOpen] = useState(false);
    const [isRegisterOpen, setRegisterIsOpen] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-zinc-950">
            <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
                <div>
                    <a href="/">
                        <figure className="w-24 h-auto flex items-center">
                            <img src="/images/webboard-logo.png" />
                        </figure>
                    </a>
                </div>
                <div className="flex gap-2">
                    {!isAuthenticated ? (
                        <>
                    <button className="px-4 py-1 bg-lime-300 rounded-3xl" onClick={() => setLoginIsOpen(true)}>
                        <h1 className="text-black font-medium">LOGIN</h1>
                    </button>
                    {isLoginOpen && <LoginModal setLoginIsOpen={setLoginIsOpen} />}
                    <button className="px-4 py-1 bg-lime-300 rounded-3xl" onClick={() => setRegisterIsOpen(true)}>
                        <h1 className="text-black font-medium">REGISTER</h1>
                    </button>
                    {isRegisterOpen && <RegisterModal setRegisterIsOpen={setRegisterIsOpen} />}
                    </>
                    ) : (
                        <button className="px-4 py-1 bg-red-500 rounded-3xl" onClick={logout}>
                            <h1 className="text-white font-medium">LOGOUT</h1>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
