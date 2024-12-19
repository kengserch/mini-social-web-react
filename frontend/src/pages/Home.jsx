import React, { useState, useContext } from "react";
import Filter from "../components/Filter";
import Hasetag from "../components/Hasetag";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

const Home = () => {
    let navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isCreatedPostOpen, setCreatePost] = useState(false);

    const handleCreatePostClick = () => {
        if (isAuthenticated) {
            setCreatePost(true);
        } else {
            alert("Please log in to create a post.");
            navigate("/login");
        }
    };

    return (
        <div className="container">
            <div className="grid grid-cols-4">
                <Filter />
                <div className="col-span-2 flex flex-col p-4 h-auto rounded-xl min-h-[200px]">
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-lime-300 rounded-3xl" onClick={handleCreatePostClick}>
                            <h1 className="text-black font-bold">Create post</h1>
                        </button>
                        {isCreatedPostOpen && <CreatePostModal setCreatePost={setCreatePost} />}
                    </div>
                    <PostCard />
                </div>
                <Hasetag />
            </div>
        </div>
      
    );
};

export default Home;
