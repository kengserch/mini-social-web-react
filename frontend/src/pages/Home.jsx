import React, { useState } from "react";
import Filter from "../components/Filter";
import Hasetag from "../components/Hasetag";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { Link } from "react-router";

const Home = () => {
    const [isCreatedPostOpen, setCreatePost] = useState(false);
    return (
        <section className="pt-28 lg:pt-28">
            <div className="container max-w-screen-xl mx-auto items-center">
                <div className="grid grid-cols-4 gap-10  relative">
                    <Filter />
                    <div className="col-span-2 flex flex-col p-4 h-auto rounded-xl">
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-lime-300 rounded-3xl" onClick={() => setCreatePost(true)}>
                                <h1 className="text-black font-medium">Create post</h1>
                            </button>
                            {isCreatedPostOpen && <CreatePostModal setCreatePost={setCreatePost} />}
                        </div>
                        <PostCard />
                    </div>
                    <Hasetag />
                </div>
            </div>
        </section>
    );
};

export default Home;
