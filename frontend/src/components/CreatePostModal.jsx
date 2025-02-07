import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const CreatePostModal = ({ setCreatePost, user }) => {
    const [inputs, setInputs] = useState({
        title: '',
        category_id: '',
        post_image: null,
        preview: null,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setInputs((prev) => ({
                ...prev,
                [name]: file,
                preview: file ? URL.createObjectURL(file) : null,
            }));
        } else {
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.title || !inputs.category_id) {
            alert('Please fill in all required fields!');
            return;
        }

        const formData = new FormData();
        formData.append('post_image', inputs.post_image);
        formData.append('user_id', user);
        formData.append('category_id', parseInt(inputs.category_id));
        formData.append('title', inputs.title);

        try {
            await axios.post(`${API_BASE_URL}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            location.reload();
        } catch (err) {
            console.error(err);
            alert('Error post profile.');
        }

        console.log('Submitted Data:', inputs);
    };

    return (
        <>
            <div className="wrapper-model" onClick={() => setCreatePost(false)}>
                <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setCreatePost(false)}>
                            X
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex p-4 flex-col gap-3 justify-center">
                            <h1 className="text-center">Create Post</h1>
                            {inputs.preview && (
                                <div className="mt-4">
                                    <img
                                        src={inputs.preview}
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
                                    name="post_image"
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                    placeholder="Password..."
                                />
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Post Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={inputs.title}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Post title . . ."
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Category</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="radio"
                                        name="category_id"
                                        id="general"
                                        value="1"
                                        checked={inputs.category_id === '1'}
                                        onChange={handleChange}
                                    />
                                    <label className="block text-sm text-white">General</label>
                                    <input
                                        type="radio"
                                        name="category_id"
                                        id="technology"
                                        value="2"
                                        checked={inputs.category_id === '2'}
                                        onChange={handleChange}
                                    />
                                    <label className="block text-sm text-white">Technology</label>
                                    <input
                                        type="radio"
                                        name="category_id"
                                        id="education"
                                        value="3"
                                        checked={inputs.category_id === '3'}
                                        onChange={handleChange}
                                    />
                                    <label className="block text-sm text-white">Education</label>
                                    <input
                                        type="radio"
                                        name="category_id"
                                        id="game"
                                        value="4"
                                        checked={inputs.category_id === '4'}
                                        onChange={handleChange}
                                    />
                                    <label className="block text-sm text-white">Game</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex p-4 justify-center">
                            <button type="submit" className="py-2  w-full bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-medium">Create Post</h1>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePostModal;
