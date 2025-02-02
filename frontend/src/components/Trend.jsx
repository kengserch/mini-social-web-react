import React from 'react';

const Trend = ({ postCount }) => {
    return (
        <div className="flex justify-start p-6 bg-zinc-950/85 sticky top-28 h-max rounded-xl">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl">Trending Now</h1>
                {postCount.map((category) => (
                    <div>
                        <h2 className="text-lg"># {category.category_name}</h2>
                        <h2 className="text-base">{category.post_count} posts</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trend;
