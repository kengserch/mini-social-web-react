import React, { useState, useEffect } from "react";
import ProfileModal from "../components/ProfileModal";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Profile = () => {
    const { user, isLoading: authLoading, hasProfile } = useAuth();
    const [isProfile, setProfile] = useState(false); // สำหรับเปิด/ปิด Modal
    const [profileData, setProfileData] = useState(null); // ข้อมูลโปรไฟล์
    const [isFetching, setIsFetching] = useState(false); // สถานะโหลดข้อมูล

    // ฟังก์ชันเปิด Modal
    const handleProfile = () => {
        setProfile(true);
    };

    // ดึงข้อมูลโปรไฟล์เมื่อ user หรือ hasProfile เปลี่ยนแปลง
    useEffect(() => {
        if (!user || !hasProfile) {
            setProfileData(null);
            return;
        }

        const fetchProfile = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/profiles/${user}`);
                if (response.data.profile) {
                    setProfileData(response.data.profile);
                } else {
                    console.error("Profile not found");
                    setProfileData(null);
                }
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setProfileData(null);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, [user, hasProfile]);

    //แสดงหน้าจอ Loading
    if (authLoading || isFetching || !profileData) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* <p className="text-lg text-gray-500">Loading profile...</p> */}
            </div>
        );
    }

    // ฟังก์ชันสำหรับจัดการแสดงผล
    // const renderProfileContent = () => {
    //      ถ้ายังไม่มีโปรไฟล์
    //     if (!profileData || !hasProfile) {
    //         return (
    //             <div className="flex flex-col items-center justify-center h-screen">
    //                 <p className="text-lg text-gray-500">Profile not found. Please create your profile.</p>
    //                 <button className="px-4 py-1 bg-lime-300 rounded-3xl" onClick={handleProfile}>
    //                     <h1 className="text-black font-bold">Create Profile</h1>
    //                 </button>
    //                 {isProfile && <ProfileModal setProfile={setProfile} />}
    //             </div>
    //         );
    //     }

        // ถ้ามีโปรไฟล์
        return (
            
                <div className="container">
                    <div className="flex justify-end pt-3">
                        <button className="px-4 py-1  bg-lime-300 rounded-3xl" onClick={handleProfile}>
                            <h1 className="text-black font-bold">Edit Profile</h1>
                        </button>
                        {isProfile && <ProfileModal setProfile={setProfile} profileData={profileData} />}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl mt-3 font-semibold">{profileData.username || "Username"}</h1>
                        <figure className="img-box w-40 h-40 rounded-full ring-2 ring-blue-500">
                            <img src={profileData.avatar_url || "./images/hand-drawn.avif"} alt="Profile Avatar" className="img-cover rounded-full" />
                        </figure>
                        <div className="flex flex-col items-center mt-2 gap-2">
                            <h1 className="text-xl">{profileData.full_name || "Fullname"}</h1>
                            <h1 className="text-xl">Email: {profileData.email || "example@email.com"}</h1>
                        </div>
                        <div className="flex flex-col gap-2 max-w-xl text-center bg-zinc-800 rounded-xl p-4">
                            <h1 className="text-xl">Bio</h1>
                            <p>{profileData.bio || "This user hasn't written a bio yet. Add some information about yourself!"}</p>
                        </div>
                    </div>
                </div>
           
        );
    

  
};

export default Profile;
