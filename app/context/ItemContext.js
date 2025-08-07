"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState("");
  const [searched, setSearched] = useState("");
  const [backupItems, setBackupItems] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/items`
        );

        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        // console.log("Fetched items:", data);
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        searched,
        setSearched,
        backupItems,
        setBackupItems,
        error,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemContext);
}
