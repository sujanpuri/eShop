"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar.js"; // adjust the path if needed
import { useState } from "react";

export default function BuyNowPage() {
  const params = useSearchParams();

  const name = params.get("name");
  const price = params.get("price");
  const image = params.get("image");
  const description = params.get("description") || "No description available";
  const category = params.get("category") || "Uncategorized";

  const [quantity, setQuantity] = useState(1);
  const subtotal = (price * quantity).toFixed(2);

  return (
    <div>
      <Navbar />

      <div className="mt-4 pt-24 mb-4 text-center">
        <h1 className="text-3xl font-bold text-white inline-flex items-center gap-2">
          🛒 Buy Now
        </h1>
        <div className="mt-1 w-18 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow p-4 max-w-xl mx-auto">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="rounded-lg w-full h-64 object-cover mb-4"
        />

        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <p className="text-gray-400 mb-2 text-sm">{description}</p>
        <p className="text-green-400 font-bold text-lg">Rs. {price}</p>

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="quantity" className="text-white font-medium">
            Quantity:
          </label>

          <div className="flex items-center bg-gray-800 rounded border border-gray-700 overflow-hidden">
            {/* Decrease button */}
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 text-white hover:bg-gray-700"
            >
              -
            </button>

            {/* Number input */}
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="no-spinner w-14 text-center px-2 py-1 bg-gray-800 text-white outline-none"
            />

            {/* Increase button */}
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 text-white hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <p className="mt-4 text-white font-semibold">
          Subtotal: <span className="text-green-400">Rs. {subtotal}</span>
        </p>

        <button className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
