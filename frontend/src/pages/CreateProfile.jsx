import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
});

const CreateProfile = () => {
    const { user } = useAuth();
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue('avatar', file); // ไม่ต้อง validate
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar || '');
        formData.append('user_id', user);
        formData.append('full_name', data.fullName);
        formData.append('bio', data.bio || '');

        try {
            const response = await axios.post(`${API_BASE_URL}/profiles/create-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile created successfully!');
            console.log(response.data);
            window.location = '/';
        } catch (err) {
            console.error(err);
            toast.error('Error creating profile.');
        }
    };

    return (
        <div className="wrapper-form">
            <div className="form">
                <div className="flex justify-end pr-4 pt-3">
                    <button className="text-white">X</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex p-4 flex-col gap-3 items-center">
                        <h1 className="text-center">Create Profile</h1>

                        {preview && (
                            <div className="w-32 h-32 mb-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full border border-gray-300"
                                />
                            </div>
                        )}

                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Profile Image (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('avatar')}
                                onChange={handleFileChange}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Fullname</label>
                            <input
                                type="text"
                                {...register('fullName')}
                                onBlur={() => trigger('fullName')}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                placeholder="Full name..."
                            />
                            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Bio (Optional)</label>
                            <textarea
                                rows={4}
                                cols={40}
                                {...register('bio')}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                placeholder="Bio..."
                            />
                        </div>
                    </div>

                    <div className="flex p-4 justify-center">
                        <button type="submit" className="py-2 w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-bold">Create Profile</h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
