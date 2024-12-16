import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const Register = () => {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const registerUser = async () => {
        if (inputs.password !== inputs.confirmpassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/users/register", {
                email: inputs.email,
                username: inputs.username,
                password: inputs.password,
            });
            if (response.data.status === "ok") {
                alert("Register Success");
                navigate("/login");
            } else {
                alert("Register failed: " + response.data.message);
                console.log("Login failed");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Register failed. Please try again later.");
            }
            console.error("Register error:", error);
        }
    };

    return (
        <>
            <div className="wrapper-form">
                <div className="form">
                    <div className="flex justify-start pr-4 pt-3">
                      <Link to="/login">
                        <button className="text-white">
                            back
                        </button>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/">
                            <figure className="w-32 h-auto">
                                <img src="/images/webboard-logo.png" />
                            </figure>
                        </Link>
                    </div>

                    <div className="flex p-4 flex-col gap-3 justify-center mt-6">
                        <h1 className="text-center">REGISTER</h1>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Email</label>
                            <input required type="text" placeholder="Email..." name="email" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Username</label>
                            <input required type="text" placeholder="username..." name="username" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Password</label>
                            <input required type="password" placeholder="Password..." name="password" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Confirm Password</label>
                            <input required type="password" placeholder="Confirm Password..." name="confirmpassword" onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button onClick={registerUser} className="py-2  w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Register</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
