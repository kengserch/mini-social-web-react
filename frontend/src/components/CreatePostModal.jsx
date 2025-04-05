import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    category_id: yup.string().required('Please select a category'),
    post_image: yup.mixed().required('Post image is required'),
});

const CreatePostModal = ({ setCreatePost, user }) => {
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

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('post_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('post_image', data.post_image);
        formData.append('user_id', user);
        formData.append('category_id', parseInt(data.category_id));
        formData.append('title', data.title);

        try {
            await axios.post(`${API_BASE_URL}/posts`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Created post successfully!');
            setCreatePost(false)
        } catch (err) {
            console.error(err);
            toast.error('Error creating post!');
        }
    };

    return (
        <div className="wrapper-model" onClick={() => setCreatePost(false)}>
            <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end pr-4 pt-3">
                    <button className="text-white" onClick={() => setCreatePost(false)}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex p-4 flex-col gap-3 justify-center">
                        <h1 className="text-center">Create Post</h1>

                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-auto max-h-64 object-cover rounded-md"
                                />
                            </div>
                        )}

                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Post Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none"
                            />
                            <p className="text-red-500 text-sm">{errors.post_image?.message}</p>
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Post Title</label>
                            <input
                                type="text"
                                {...register('title')}
                                onBlur={() => trigger('title')}
                                className="w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none"
                                placeholder="Post title..."
                            />
                            <p className="text-red-500 text-sm">{errors.title?.message}</p>
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Category</label>
                            <div className="flex gap-2 items-center">
                                {[
                                    { id: '1', name: 'General' },
                                    { id: '2', name: 'Technology' },
                                    { id: '3', name: 'Education' },
                                    { id: '4', name: 'Game' },
                                ].map(({ id, name }) => (
                                    <div key={id} className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            value={id}
                                            {...register('category_id')}
                                            onBlur={() => trigger('category_id')}
                                            id={id}
                                        />
                                        <label htmlFor={id} className="text-sm text-white">
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <p className="text-red-500 text-sm">{errors.category_id?.message}</p>
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button type="submit" className="py-2 w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Create Post</h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
