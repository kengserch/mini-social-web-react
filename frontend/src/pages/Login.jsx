import React, { useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Login = () => {
    const auth = useAuth();

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const loginUser = (data) => {
        auth.loginAction(data);
    };

    return (
        <>
            <div className="wrapper-form">
                <div className="form">
                    <div className="flex justify-center">
                        <Link to="/">
                            <figure className="w-32 h-auto">
                                <img src="/images/webboard-logo.png" />
                            </figure>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="flex p-4 flex-col gap-5 justify-center mt-6">
                            <h1 className="text-center font-bold">LOGIN</h1>
                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Email</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Email..."
                                    name="email"
                                    {...register('email')}
                                    onBlur={() => trigger('email')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>
                            </div>
                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Password..."
                                    name="password"
                                    {...register('password')}
                                    onBlur={() => trigger('password')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>
                        <div className="flex p-4 justify-center">
                            <button className="py-2  w-full bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-bold">Login</h1>
                            </button>
                        </div>
                    </form>
                    <div className="flex gap-2 mt-3 justify-center">
                        <h1>Don't have an account?</h1>
                        <Link to="/register">
                            <h1 className="text-blue-500">Signup</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
