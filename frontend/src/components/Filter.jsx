import React, { useState } from "react";

const Filter = () => {
    const buttonData = [
        { label: "General", value: "general" },
        { label: "Technology", value: "technology" },
        { label: "Education", value: "education" },
        { label: "Game", value: "game" },
    ];
    const [selectedValue, setSelectedValue] = useState("");
    const handleButtonClick = (value) => {
        if (selectedValue === value) {
            setSelectedValue("");
        } else {
            setSelectedValue(value);
        }
    };
    return (
        <div className="flex flex-col gap-4 justify-start p-4 sticky top-28 h-[200px] rounded-xl">
            <h1 className="text-xl font-bold">Filters</h1>
            <h1 className="text-xl">Select Topic</h1>
            <div className="flex flex-wrap gap-2">
                {buttonData.map((button) => (
                    <button key={button.value} className={`px-4 border-2 rounded-3xl ${selectedValue === button.value ? "border-amber-600 bg-amber-600 text-white" : "border-amber-600 text-white"}`} onClick={() => handleButtonClick(button.value)}>
                        <h1 className="font-medium">{button.label}</h1>
                    </button>
                ))}

                {/* <div className="mt-4">
                    <p>Selected Value: {selectedValue || "None"}</p>
                </div> */}
            </div>
        </div>
    );
};

export default Filter;
