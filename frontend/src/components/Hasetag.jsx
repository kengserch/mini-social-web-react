import React from "react";

const Hasetag = () => {
    return (
        <div className="flex justify-start p-6 bg-zinc-950/85 sticky top-28 h-[200px] rounded-xl">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl">Trending Now</h1>
                <div>
                    <h2 className="text-lg">#hasetag</h2>
                    <h2 className="text-base">2posts</h2>
                </div>
                <div>
                    <h2 className="text-lg">#hasetag</h2>
                    <h2 className="text-base">2posts</h2>
                </div>
            </div>
        </div>
    );
};

export default Hasetag;
