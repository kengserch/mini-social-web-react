import React from 'react';

const PostCard = () => {
    return (
        <div className="w-full h-auto p-6 rounded-lg mt-4 bg-zinc-800 min-h-[300px]">
            <div className="flex gap-4">
                <figure className="img-box w-16 h-16 rounded-full">
                    <img src="./images/hand-drawn.avif" width={64} height={64} alt="Avatar" />
                </figure>
                <div>
                    <h1 className="text-lg font-normal">Author Post Name</h1>
                    <h1>2 days ago</h1>
                </div>
            </div>
            <div className="mt-4 grid grid-flow-row py-6 gap-4 border-b-2 border-zinc-400/20">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-normal">Lorem ipsum dolor sit amet.</h1>
                    <figure className="img-box w-full h-96 rounded-xl">
                        <img className="w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" alt="Post Image" loading="lazy" />
                    </figure>
                </div>

                <div>
                    <button className="px-4 border-2 border-amber-600  rounded-3xl">
                        <h1 className="text-white font-medium">Tags</h1>
                    </button>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                    <button className="px-4 bg-lime-300 rounded-3xl">
                        <h1 className="text-black font-medium">LIKE</h1>
                    </button>
                    <h1>1</h1>
                </div>
                <h1>2 comments</h1>
            </div>
        </div>
    );
};

export default PostCard;
