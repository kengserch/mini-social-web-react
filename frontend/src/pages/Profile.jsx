import React, { useState, useEffect } from 'react';
import ProfileModal from '../components/UpdateProfileModal';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router';

const Profile = () => {
    const { id } = useParams();

    const { user, isLoading: authLoading, fetchProfileById } = useAuth();
    const [isProfile, setProfile] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const isOwner = id === String(user);

    const fetchData = async () => {
        const profile = await fetchProfileById(id);
        setProfileData(profile);
    };

    useEffect(() => {
        fetchData();
    }, [id,profileData]);

    const handleProfile = () => {
        setProfile(true);
    };

    useEffect(() => {
        if (!user) {
            return;
        }
    }, [user]);

    if (authLoading || !profileData) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* <p className="text-lg text-gray-500">Loading profile...</p> */}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="flex justify-end pt-3">
                {isOwner && (
                    <button className="px-4 py-1  bg-lime-300 rounded-3xl" onClick={handleProfile}>
                        <h1 className="text-black font-bold">Edit Profile</h1>
                    </button>
                )}
                {isProfile && <ProfileModal setProfile={setProfile} profileData={profileData} />}
            </div>

            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl mt-3 font-semibold">{profileData.username || 'Username'}</h1>
                <figure className="img-box w-40 h-40 rounded-full ring-2 ring-blue-500">
                    <img
                        src={profileData.avatar_url || "/images/hand-drawn.avif"}
                        alt="Profile Avatar"
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div className="flex flex-col items-center mt-2 gap-2">
                    <h1 className="text-xl">{profileData.full_name || 'Fullname'}</h1>
                    <h1 className="text-xl">Email: {profileData.email || 'example@email.com'}</h1>
                </div>
                <div className="flex flex-col gap-2 max-w-xl text-center bg-zinc-800 rounded-xl p-4">
                    <h1 className="text-xl">Bio</h1>
                    <p>{profileData.bio || 'Add some information about yourself!'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
