"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          MyShop
        </Link>
        <Link href="/routes/products" className="hover:text-gray-300">
          Products
        </Link>
        <Link href="/routes/profile" className="hover:text-gray-300">
          Profile
        </Link>
      </div>

      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}
