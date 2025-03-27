import Comment from './Comment';
import React, { useState, useEffect } from 'react';
import { TbThumbUp, TbThumbUpFilled, TbDots, TbEdit, TbTrash } from 'react-icons/tb';
import EditPostModal from './EditPostModal';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

const PostCard = ({
    postData,
    handleLikePost,
    setPostData,
    fetchPost,
    commentModal,
    handleComment,
    setCommentModal,
}) => {
    const { user } = useAuth();
    const [showMenu, setShowMenu] = useState(null);
    const menuToggle = (post_id) => {
        setShowMenu((prev) => (prev === post_id ? null : post_id));
    };
    const [isPostEdit, setPostEdit] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleEditPost = (post) => {
        setSelectedPost(post);
        setPostEdit(true);
    };
    const handleDeletePost = async (post_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`${API_BASE_URL}/posts/${post_id}`);
            location.reload()
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete the post.');
        }
    };

    return (
        <div>
            {postData.length > 0 ? (
                postData.map((post) => (
                    <div key={post.post_id} className="w-full h-auto p-6 rounded-lg mt-6 bg-zinc-800 min-h-[300px]">
                        <div className="mb-8">
                            <div className="flex justify-between gap-4">
                                <div className="flex gap-4">
                                    <figure className="img-box w-16 h-16 rounded-full">
                                        <img
                                            src={post.avatar_url}
                                            width={64}
                                            height={64}
                                            alt="Avatar"
                                            className="w-full h-full object-cover object-center rounded-full"
                                        />
                                    </figure>
                                    <div>
                                        <h1 className="text-lg font-normal">{post.full_name}</h1>
                                        <h1>{new Date(post.created_at).toLocaleDateString()}</h1>
                                    </div>
                                </div>
                                {post.user_id === user && (
                                    <div className="relative">
                                        <TbDots
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() => menuToggle(post.post_id)}
                                        />
                                        <div
                                            className={`w-12 h-auto bg-zinc-900 absolute rounded-lg inset-x-0 mt-2 origin-top transform transition-transform ease-in-out duration-75 ${
                                                showMenu === post.post_id ? 'scale-y-100' : 'scale-y-0'
                                            }`}
                                        >
                                            <div className="flex px-2 py-1 flex-col items-center gap-1 cursor-pointer">
                                                <h1 className="px-1 py-1 hover:bg-zinc-600 hover:rounded-md">
                                                    <TbEdit className="w-5 h-5" onClick={() => handleEditPost(post)} />
                                                </h1>
                                                <h1 className="px-1 py-1 hover:bg-zinc-600 hover:rounded-md">
                                                    <TbTrash
                                                        className="w-5 h-5"
                                                        onClick={() => handleDeletePost(post.post_id)}
                                                    />
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {isPostEdit && <EditPostModal setPostEdit={setPostEdit} post={selectedPost} />}
                            </div>
                            <div className="mt-4 grid grid-flow-row py-6 gap-4 border-b-2 border-zinc-400/20">
                                <div className="flex flex-col gap-5">
                                    <h1 className="text-xl font-normal">{post.title}</h1>
                                    <figure className="img-box w-full h-96 rounded-xl">
                                        <img
                                            className="w-full h-full object-cover object-center"
                                            src={post.post_url}
                                            alt="Post Image"
                                            loading="lazy"
                                        />
                                    </figure>
                                </div>
                                <div>
                                    <h1 className="text-white font-medium text-base">#{post.category_name}</h1>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-2 items-center">
                                    <button onClick={() => handleLikePost(post.post_id)} className="rounded-3xl">
                                        {post.is_liked ? (
                                            <h1 className="text-amber-600 flex items-center">
                                                <TbThumbUpFilled className="w-8 h-8" /> Like
                                            </h1>
                                        ) : (
                                            <h1 className="text-white flex items-center">
                                                <TbThumbUp className="w-8 h-8" /> Like
                                            </h1>
                                        )}
                                    </button>
                                    <h1>- {post.like_count} like</h1>
                                </div>
                                <button onClick={() => handleComment(post.post_id)}>
                                    {post.comment_count} comments
                                </button>
                                {commentModal === post.post_id && (
                                    <Comment
                                        setCommentModal={setCommentModal}
                                        post_id={post.post_id}
                                        fetchPost={fetchPost}
                                        setPostData={setPostData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-gray-500">No posts available</h1>
            )}
        </div>
    );
};

export default PostCard;
