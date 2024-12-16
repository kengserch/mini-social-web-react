import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";

const Header = () => {
    const [isLoginOpen, setLoginIsOpen] = useState(false);
    const [isRegisterOpen, setRegisterIsOpen] = useState(false);
    const { isAuthenticated, handleLogout } = useContext(AuthContext);

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
                            <NavLink to="/login">
                                <button className="px-4 py-1 bg-lime-300 rounded-3xl">
                                    <h1 className="text-black font-medium">LOGIN</h1>
                                </button>
                            </NavLink>
                        </>
                    ) : (
                        <button className="px-4 py-1 bg-red-500 rounded-3xl" onClick={handleLogout}>
                            <h1 className="text-white font-medium">LOGOUT</h1>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
