import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";

const ProfileModal = ({ setProfile, profileData }) => {
    const { user } = useAuth();
    const [fullName, setFullName] = useState(profileData?.full_name || "");
    const [bio, setBio] = useState(profileData?.bio || "");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(profileData?.avatar_url || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // สร้าง URL ชั่วคราว
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName) {
            alert("Please fill in all required fields!");
            return;
        }

        const formData = new FormData();
        formData.append("user_id", user);
        formData.append("full_name", fullName);
        formData.append("bio", bio);
        if (avatar) {
            formData.append("avatar", avatar);
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/profiles/update-profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Profile updated successfully!");
            console.log(response.data);
            setProfile(false);
            location.reload();
        } catch (err) {
            console.error(err);
            alert("Error updating profile.");
        }
    };

    return (
        <>
            <div className="wrapper-model" onClick={() => setProfile(false)}>
                <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setProfile(false)}>
                            X
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex p-4 flex-col gap-3 items-center">
                            <h1 className="text-center">Edit Profile</h1>

                            {/* แสดงตัวอย่างรูป */}
                            {preview && (
                                <div className="w-32 h-32 mb-4">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full border border-gray-300" />
                                </div>
                            )}

                            {/* Input รูปภาพ */}
                            <div className="w-full">
                                <label className="block mb-2 text-start text-sm text-white">Profile Image</label>
                                <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm" />
                            </div>

                            {/* Input ชื่อ */}
                            <div className="w-full">
                                <label className="block mb-2 text-start text-sm text-white">Fullname</label>
                                <input type="text" name="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm" placeholder="Full name..." />
                            </div>

                            {/* Input Bio */}
                            <div className="w-full">
                                <label className="block mb-2 text-start text-sm text-white">Bio</label>
                                <textarea rows={4} cols={40} name="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm" placeholder="Bio..." />
                            </div>
                        </div>

                        {/* ถ้ามีโปรไฟล์แล้วให้แสดงปุ่มอัปเดต ถ้ายังไม่มี แสดงปุ่มสร้าง */}
                        <div className="flex p-4 justify-center">
                            <button type="submit" className="py-2 w-full bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-bold">Update Profile</h1>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileModal;
