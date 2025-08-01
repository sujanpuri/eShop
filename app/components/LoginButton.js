// components/LoginButton.js
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <div>
          <Link href="/routes/profile">{session.user.email}</Link>
        </div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
