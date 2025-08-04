"use client";

import Navbar from "../../components/Navbar.js";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// Demo product data
const demoProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    image: "/demo/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    image: "/demo/watch.jpg",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 1499,
    image: "/demo/mouse.jpg",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 2599,
    image: "/demo/speaker.jpg",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {demoProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg w-full h-48 object-cover"
              />

              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-400 text-sm">Rs. {product.price}</p>

              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-full transition">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
