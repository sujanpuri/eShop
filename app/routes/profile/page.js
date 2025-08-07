// app/profile/page.js
"use client";

import Navbar from "../../components/Navbar.js";
import { useUser } from "../../context/userContext.js";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="flex items-center justify-center h-[calc(100vh-64px)] px-4">
          <div className="text-center space-y-2">
            <p className="text-2xl font-semibold text-white">
              You are not logged in.
            </p>
            <p className="text-sm text-gray-400">
              Please log in to continue using the app.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-md pt-30 mx-auto text-center">
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-6 shadow-md">
          <Image
            src={user.image}
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full border-2 border-white"
          />

          <p className="text-xl mt-4 font-semibold">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
          <br />
          <p>More Features will be added soon!</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
