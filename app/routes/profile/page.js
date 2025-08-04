// app/profile/page.js
"use client";

import { useUser } from "../../context/userContext.js";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white text-black rounded-2xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">👤 Profile</h1>
      <div className="flex flex-col items-center">
        <Image
          src={user.image}
          alt="Profile Picture"
          width={96}
          height={96}
          className="rounded-full"
        />
        <p className="text-xl mt-4 font-semibold">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
