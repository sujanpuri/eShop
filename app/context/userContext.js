// context/UserContext.js
"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);

      // Send user to backend on first login
      const saveUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/costumers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });

          if (!res.ok) throw new Error("Failed to save user");

        } catch (error) {
          console.error("Error saving user:", error);
        }
      };

      saveUser();
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
