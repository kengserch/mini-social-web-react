import React from "react";

const CreatePostModal = ({ setCreatePost }) => {
    return (
        <>
            <div className="wrapper-model" onClick={() => setCreatePost(false)}>
                <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setCreatePost(false)}>
                            X
                        </button>
                    </div>
                    <div className="flex p-4 flex-col gap-3 justify-center">
                        <h1 className="text-center">Create Post</h1>
                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Post Image</label>
                            <input type="file" className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm" placeholder="Password..." />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Post Title</label>
                            <input className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Post title . . ." />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm text-white">Category</label>
                            <div className="flex gap-2 items-center">
                                <input type="radio" name="category" id="general" value="1" />
                                <label className="block text-sm text-white">General</label>
                                <input type="radio" name="category" id="technology" value="1" />
                                <label className="block text-sm text-white">Technology</label>
                                <input type="radio" name="category" id="education" value="2" />
                                <label className="block text-sm text-white">Education</label>
                                <input type="radio" name="category" id="game" value="3" />
                                <label className="block text-sm text-white">Game</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button className="py-2  w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Create Post</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePostModal;
