import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";
import { API_BASE_URL } from "../config";


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

function EditPostModal({ setPostEdit, post }) {
        const { user } = useAuth();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: post?.title || '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (post) {
            reset({ title: post.title || '' });
        }
    }, [post, reset]);

    const onSubmit = async (data) => {
        const payload = {
            user_id: user,
            post_id: post.post_id,
            title: data.title,
        };
    
        console.log("Sending data:", payload);
    
        try {
            const response = await axios.put(`${API_BASE_URL}/posts/update-post`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            alert('Post updated successfully!');
            console.log(response.data);
            location.reload();
        } catch (err) {
            console.error('Error updating post:', err);
            alert('Error updating post.');
        }
    };

    return (
        <div className="wrapper-model" onClick={() => setPostEdit(false)}>
            <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end pr-4 pt-3">
                    <button className="text-white" onClick={() => setPostEdit(false)}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex p-4 flex-col gap-3 justify-center">
                        <h1 className="text-center">Update Post</h1>
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
                    </div>
                    <div className="flex p-4 justify-center">
                        <button type="submit" className="py-2 w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Update Post</h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPostModal;
