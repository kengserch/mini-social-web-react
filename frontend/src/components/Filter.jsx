import React from 'react';

const Filter = ({ selectedCategory, setSelectedCategory }) => {
    const buttonData = [
        { label: 'General', value: 'general' },
        { label: 'Technology', value: 'technology' },
        { label: 'Education', value: 'education' },
        { label: 'Game', value: 'game' },
    ];

    const handleButtonClick = (value) => {
        const newValue = selectedCategory === value ? '' : value; 
        setSelectedCategory(newValue);
        console.log(newValue);
    };

    return (
        <div className="flex flex-col gap-4 justify-start p-4  h-[200px] rounded-xl md:sticky md:top-28">
            <h1 className="text-xl font-bold">Filters</h1>
            <h1 className="text-xl">Select Topic</h1>
            <div className="flex flex-wrap gap-2">
                {buttonData.map((button) => (
                    <button
                        key={button.value}
                        className={`px-4 border-2 rounded-3xl ${
                            selectedCategory === button.value
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-amber-600 text-white'
                        }`}
                        onClick={() => handleButtonClick(button.value)}
                    >
                        <h1 className="font-medium">{button.label}</h1>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
