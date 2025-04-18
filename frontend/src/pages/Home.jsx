import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Trend from '../components/Trend';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';

const Home = () => {
    let navigate = useNavigate();
    const { isAuthenticated, hasProfile, user } = useAuth();
    const [isCreatedPostOpen, setCreatePost] = useState(false);
    const [postData, setPostData] = useState([]);
    const [postCount, setPostCount] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [commentModal, setCommentModal] = useState(null);

    const handleCreatePost = () => {
        if (isAuthenticated && hasProfile) {
            setCreatePost(true);
        } else if (isAuthenticated && !hasProfile) {
            toast.error('Please Create Profile first!');
            navigate('/create-profile');
        } else {
            toast.info('Please log in to create a post!');
            navigate('/login');
        }
    };

    const handleComment = (post_id) => {
        if (isAuthenticated && hasProfile) {
            setCommentModal(post_id);
        } else if (isAuthenticated && !hasProfile) {
            toast.info('Please Create Profile first!');
            navigate('/create-profile');
        } else {
            toast.info('Please log in to see comment!');
            navigate('/login');
        }
    };

    const handleLikePost = async (post_id) => {
        if (isAuthenticated && hasProfile) {
            try {
                const response = await axios.post(`${API_BASE_URL}/posts/like`, {
                    post_id,
                    user_id: user,
                });

                if (response.status === 200) {
                    setPostData((prevPostData) =>
                        prevPostData.map((post) =>
                            post.post_id === post_id
                                ? {
                                      ...post,
                                      like_count: response.data.like_count,
                                      is_liked: !post.is_liked,
                                  }
                                : post
                        )
                    );
                }
                // console.log('Like successful:', response.data);
            } catch (error) {
                console.error('Error liking post:', error);
                toast.error('An error occurred while liking the post!');
            }
        } else if (isAuthenticated && !hasProfile) {
            toast.info('Please Create Profile first!');
            navigate('/create-profile');
        } else {
            toast.info('Please log in to like posts!');
            navigate('/login');
        }
    };

    const fetchPost = async () => {
        try {
            const url = user ? `${API_BASE_URL}/posts?user_id=${user}` : `${API_BASE_URL}/posts`;

            const response = await axios.get(url);
            if (response.data.posts) {
                setPostData(response.data.posts);
                setPostCount(response.data.posts_count);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [user]);

    const filteredPosts = selectedCategory
        ? postData.filter((post) => post.category_name.toLowerCase() === selectedCategory)
        : postData;

    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4">
                <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <div className="col-span-2 flex flex-col p-4 h-auto rounded-xl min-h-[200px]">
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-lime-300 rounded-3xl" onClick={handleCreatePost}>
                            <h1 className="text-black font-bold">Create post</h1>
                        </button>
                        {isCreatedPostOpen && <CreatePostModal setCreatePost={setCreatePost} user={user} fetchPost={fetchPost} />}
                    </div>
                    <PostCard
                        postData={filteredPosts}
                        handleLikePost={handleLikePost}
                        fetchPost={fetchPost}
                        commentModal={commentModal}
                        handleComment={handleComment}
                        setCommentModal={setCommentModal}
                    />
                </div>
                <Trend postCount={postCount} />
            </div>
        </div>
    );
};

export default Home;
