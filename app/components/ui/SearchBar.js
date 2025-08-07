"use client";

import { Search } from "lucide-react";
import { useItems } from "../../context/ItemContext.js";

export default function SearchBar({ className }) {
  const { searched, setSearched } = useItems();
  // console.log("SearchBar searched:", searched);

  return (
    <div className={`relative w-full max-w-xs ${className}`}>
      <input
        type="text"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        placeholder="Search..."
        className={`w-full pl-4 pr-10 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white`}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
    </div>
  );
}
