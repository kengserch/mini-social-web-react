import React, { useState , useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const LoginModal = ({ setLoginIsOpen }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { setIsAuthenticated } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const loginUser = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/users/login", inputs);
            if (response.data.status === "ok") {
                localStorage.setItem("token", response.data.token);
                setIsAuthenticated(true);
                setLoginIsOpen(false);
            } else {
                //alert("Login failed: " + response.data.message);
                console.log("Login failed")
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials or try again later.");
        }
    };

    return (
        <>
            <div className="wrapper-model" onClick={() => setLoginIsOpen(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setLoginIsOpen(false)}>
                            X
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <figure className="w-32 h-auto">
                            <img src="/images/webboard-logo.png" />
                        </figure>
                    </div>
                    <div className="flex p-4 flex-col gap-3 justify-center mt-6">
                        <h1 className="text-center">LOGIN</h1>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Email</label>
                            <input required type="text" placeholder="Email..." name="email" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Password</label>
                            <input required type="password" placeholder="Password..." name="password" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button onClick={loginUser} className="py-2  w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Login</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
