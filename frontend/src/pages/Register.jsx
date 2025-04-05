import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import { API_BASE_URL } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const Register = () => {
    let navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required'),
        username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmpassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
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

    const registerUser = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, {
                email: data.email,
                username: data.username,
                password: data.password,
            });

            if (response.data.status === 'ok') {
                toast.success('Register Success');
                navigate('/login');
            } else {
                toast.error('Register failed:' + response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Register failed. Please try again later.');
        }
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

                    <form onSubmit={handleSubmit(registerUser)}>
                        <div className="flex px-4 flex-col gap-5 justify-center mt-6">
                            <h1 className="text-center font-bold">REGISTER</h1>

                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Email</label>
                                <input
                                    type="text"
                                    placeholder="Email..."
                                    {...register('email')}
                                    onBlur={() => trigger('email')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                                />
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>
                            </div>

                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username..."
                                    {...register('username')}
                                    onBlur={() => trigger('username')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                                />
                                <p className="text-red-500 text-sm">{errors.username?.message}</p>
                            </div>

                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password..."
                                    {...register('password')}
                                    onBlur={() => trigger('password')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                                />
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>

                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-base text-white">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password..."
                                    {...register('confirmpassword')}
                                    onBlur={() => trigger('confirmpassword')}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                                />
                                <p className="text-red-500 text-sm">{errors.confirmpassword?.message}</p>
                            </div>
                        </div>

                        <div className="flex p-4 justify-center mt-4">
                            <button type="submit" className="py-2 w-full bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-bold">Register</h1>
                            </button>
                        </div>
                    </form>

                    <div className="flex gap-2 mt-3 justify-center">
                        <h1>Have an account already?</h1>
                        <Link to="/login">
                            <h1 className="text-blue-500">Log in</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
