import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    comment: yup.string().trim().required('Comment cannot be empty'),
});

const Comment = ({ setCommentModal, post_id, fetchPost }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE_URL}/posts/${post_id}/comments`);
            setComments(res.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post_id]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const onSubmit = async (data) => {
        try {
            await axios.post(`${API_BASE_URL}/posts/comment`, {
                post_id,
                user_id: user,
                comment: data.comment,
            });

            reset();
            fetchPost();
            fetchComments();
            toast.success('Comment Completed!');
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to add comment');
        }
    };

    return (
        <div className="wrapper-model" onClick={() => setCommentModal(false)}>
            <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end pr-4 pt-3">
                    <button className="text-white" onClick={() => setCommentModal(false)}>
                        X
                    </button>
                </div>

                <h1 className="text-center text-lg font-semibold text-white">Comments</h1>

                <div className="p-4 max-h-72 overflow-y-auto space-y-4">
                    {loading ? (
                        <p className="text-gray-400 text-center">Loading comments...</p>
                    ) : comments.length === 0 ? (
                        <p className="text-gray-400 text-center">No comments yet</p>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment.comment_id}
                                className="flex items-start gap-3 border-b border-gray-700 pb-3"
                            >
                                <figure className="img-box w-10 h-10 rounded-full">
                                    <img src={comment.avatar_url} alt="avatar" className="object-cover object-center" />
                                </figure>
                                <div>
                                    <h2 className="text-white font-medium text-base">{comment.full_name}</h2>
                                    <p className="text-gray-300 text-base">{comment.comment}</p>
                                    <span className="text-gray-500 text-xs">
                                        {new Date(comment.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                    <input
                        type="text"
                        {...register('comment')}
                        onBlur={() => trigger('comment')}
                        className="w-full bg-transparent placeholder:text-gray-400 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-gray-300"
                        placeholder="Write a comment..."
                    />
                    <p className="text-red-500 text-sm">{errors.comment?.message}</p>
                    <button type="submit" className="mt-3 py-2 w-full bg-lime-300 rounded-3xl text-black font-medium">
                        Comment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Comment;
