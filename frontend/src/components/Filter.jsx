import React from "react";

const Filter = () => {
    return (
        <div className="flex flex-col gap-4 justify-start p-4 sticky top-28 h-[200px] rounded-xl">
            <h1 className="text-xl">Filters</h1>
            <h1 className="text-xl">Select Topic</h1>
            <div className="flex flex-wrap gap-2">
                <button className="px-4 border-2 border-amber-600  rounded-3xl">
                    <h1 className="text-white font-medium">General</h1>
                </button>
                <button className="px-4 border-2 border-amber-600  rounded-3xl">
                    <h1 className="text-white font-medium">Technology</h1>
                </button>
                <button className="px-4 border-2 border-amber-600  rounded-3xl">
                    <h1 className="text-white font-medium">Education</h1>
                </button>
                <button className="px-4 border-2 border-amber-600  rounded-3xl">
                    <h1 className="text-white font-medium">Game</h1>
                </button>
            </div>
        </div>
    );
};

export default Filter;
