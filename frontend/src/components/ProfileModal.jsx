import React from "react";

const ProfileModal = ({ setProfile }) => {
    return (
        <>
            <div className="wrapper-model" onClick={() => setProfile(false)}>
                <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setProfile(false)}>
                            X
                        </button>
                    </div>
                    <div className="flex p-4 flex-col gap-3 items-center">
                        <h1 className="text-center">Edit Profile</h1>
                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Profile Image</label>
                            <input type="file" name="avatar" className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm" placeholder="Password..." />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Fullname</label>
                            <input type="text" name="full_name" className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Full name..." />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-start text-sm text-white">Bio</label>
                            <textarea rows={4} cols={40} name="bio" className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Bio..." />
                        </div>
                    </div>
                    <div className="flex p-4 justify-center">
                        <button className="py-2  w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-medium">Update Profile</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileModal;
