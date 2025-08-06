"use client";

import { useState, useMemo } from "react";
import { useItems } from "../../context/ItemContext.js";
import Navbar from "../../components/Navbar.js";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function ProductsPage() {
  const { items, error } = useItems();
  // console.log("Items from context:", items);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name-asc");

  // 🧠 Get unique categories
  const categories = useMemo(() => {
    if (!Array.isArray(items)) return ["All"];
    const unique = new Set(
      items.map((item) => item.category || "Uncategorized")
    );
    return ["All", ...Array.from(unique)];
  }, [items]);

  // ✅ Apply filter and sort
  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];

    let filtered =
      selectedCategory === "All"
        ? items
        : items.filter((item) => item.category === selectedCategory);

    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [items, selectedCategory, sortOption]);

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  function ImageWithFallback({ src, alt, ...props }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Image"}
        onError={() => setImgSrc("/images/default.png")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Category Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <h1 className="text-3xl font-bold mb-6 text-center">
            🛍️ Our Products
          </h1>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        {/* Products */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!items || items.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-10 animate-pulse">
              Loading products...
            </div>
          ) : (
            filteredItems.map((product, index) => (
              <div
                key={product._id || product.id || index}
                className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  priority
                  className="rounded-lg w-full h-48 object-cover"
                />
                <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                <p className="text-green-400 font-semibold text-sm px-2 py-1 rounded inline-block w-fit bg-green-950">
                  <span className="text-white">Rs.</span> {product.price}
                </p>

                <Link
                  href={{
                    pathname: "/routes/buyNow",
                    query: {
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      description : product.description || "No description available",
                      category: product.category || "Uncategorized",
                    },
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-full transition"
                >
                  <CreditCard size={16} />
                  Buy Now
                </Link>
              </div>
            ))
          )}
        </div>
        {/* END Products */}
      </div>
    </div>
  );
}
