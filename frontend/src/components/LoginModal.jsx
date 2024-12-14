import React from "react";

const LoginModal = ({ setLoginIsOpen }) => {
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
                            <label className="block mb-2 text-sm text-white">Username</label>
                            <input className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Username..." />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-white">Password</label>
                            <input className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password..." />
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button className="py-2  w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Login</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
