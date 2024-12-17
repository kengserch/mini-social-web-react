
import React ,{useState} from "react";
import ProfileModal from "../components/ProfileModal";

const Profile = () => {
    const [isProfile, setProfile] = useState(false);

    const handleProfile = () => {
      setProfile(true);
    };

    return (
        <section className="pt-28 lg:pt-28">
            <div className="container max-w-screen-xl mx-auto items-center">
                <div className="flex justify-end">
                    <button className="px-4 py-1 bg-lime-300 rounded-3xl">
                        <h1 className="text-black font-bold" onClick={handleProfile}>
                            Edit Profile
                        </h1>
                        {isProfile && <ProfileModal setProfile={setProfile} />}
                    </button>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-xl mt-3">Fullname</h1>
                    <figure className="img-box w-40 h-40 rounded-full ring-2 ring-blue-500">
                        <img src="./images/hand-drawn.avif" className="img-cover" />
                    </figure>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">Username</h1>
                        <h1 className="text-xl">Email : keng@gmail.com</h1>
                    </div>
                    <div className="flex flex-col items-center max-w-xl text-center bg-zinc-800 rounded-xl p-4">
                        <h1 className="text-xl">Bio</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, laborum at quisquam culpa earum qui minima eveniet sint nobis praesentium!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
