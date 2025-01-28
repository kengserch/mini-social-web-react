import React, { useState, useContext, useEffect } from "react";
import Filter from "../components/Filter";
import Hasetag from "../components/Hasetag";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
    let navigate = useNavigate();
    const { isAuthenticated, hasProfile, user } = useAuth();
    const [isCreatedPostOpen, setCreatePost] = useState(false);
    const [postData, setPostData] = useState([]);


    const handleCreatePostClick = () => {
        if (isAuthenticated && hasProfile) {
            setCreatePost(true);
        } else if (isAuthenticated && !hasProfile) {
            alert("Please Create Profile first!");
            navigate("/create-profile");
        } else {
            alert("Please log in to create a post!");
            navigate("/login");
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/posts/');
                if (response.data.posts) {
                    setPostData(response.data.posts);
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                return null;
            }
        };
        fetchPost();
    },[])

    return (
        <div className="container">
            <div className="grid grid-cols-4">
                <Filter />
                <div className="col-span-2 flex flex-col p-4 h-auto rounded-xl min-h-[200px]">
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-lime-300 rounded-3xl" onClick={handleCreatePostClick}>
                            <h1 className="text-black font-bold">Create post</h1>
                        </button>
                        {isCreatedPostOpen && <CreatePostModal setCreatePost={setCreatePost} user={user} />}
                    </div>
                    <PostCard postData={postData} />
                </div>
                <Hasetag />
            </div>
        </div>
    );
};

export default Home;
