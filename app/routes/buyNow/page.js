"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar.js"; // adjust the path if needed
import { useState } from "react";
import axios from "axios";

export default function BuyNowPage() {
  const params = useSearchParams();
  const itemId = params.get("id"); // <-- this fixes ReferenceError

  const name = params.get("name");
  const price = params.get("price");
  const image = params.get("image");
  const description = params.get("description") || "No description available";
  const category = params.get("category") || "Uncategorized";
  const soldcount = params.get("soldcount") || 0;
  const available = params.get("quantity") || 0;

  const [quantity, setQuantity] = useState(1);
  const subtotal = (price * quantity).toFixed(2);

  const handleBuy = async () => {
    if (available === 0) {
      alert("Item is not available");
      return;
    }

    try {
      // Proceed with the purchase
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update/${itemId}`,
        {
          name,
          quantity,
        }
      );
      alert("Purchase successful!");
    } catch (error) {
      alert("Error processing purchase");
      console.log("Purchase error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 mb-4 text-center">
        <h1 className="text-3xl font-bold text-white inline-flex items-center gap-2">
          🛒 Buy Now
        </h1>
        <div className="mt-1 w-18 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow p-4 max-w-xl mx-auto">
        <Image
          src={image}
          alt={name}
          width={0}
          height={400}
          sizes="auto"
          className="rounded-lg w-auto object-cover h-64 mb-4 justify-center mx-auto"
        />

        <h2 className="text-xl font-semibold text-white text-center">{name}</h2>
        <p className="text-gray-400 mb-2 text-sm text-center">
          Category: {category}
        </p>
        <p className="text-gray-400 mb-2 text-sm text-center">{description}</p>
        <p className="text-white mb-2 text-lg text-center">
          Rs. <span className="text-green-400 font-bold text-lg ">{price}</span>
        </p>
        <div>
          <p className="text-white mb-2 text-lg text-center">
            Available:{" "}
            <span className="text-green-400 font-bold text-lg">
              {available}
            </span>
          </p>
          <p className="text-white mb-2 text-lg text-center">
            Sold:{" "}
            <span className="text-green-400 font-bold text-lg">
              {soldcount}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center mx-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="quantity" className="text-white font-medium">
              Quantity:
            </label>

            <div className="flex items-center bg-gray-800 rounded border border-gray-700 overflow-hidden">
              {/* Decrease button */}
              <button
                type="button"
                onClick={() => {
                  if (available === 0) return alert("Item is not available");
                  setQuantity((prev) => Math.max(1, prev - 1));
                }}
                className={`px-3 py-1 text-white hover:bg-gray-700 ${
                  available === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={available === 0}
              >
                -
              </button>

              {/* Number input */}
              <input
                id="quantity"
                type="number"
                min="1"
                max={available}
                value={quantity}
                onChange={(e) => {
                  if (available === 0) return alert("Item is not available");
                  const val = Math.max(
                    1,
                    Math.min(available, parseInt(e.target.value) || 1)
                  );
                  setQuantity(val);
                }}
                className="no-spinner w-14 text-center px-2 py-1 bg-gray-800 text-white outline-none"
                disabled={available === 0}
              />

              {/* Increase button */}
              <button
                type="button"
                onClick={() => {
                  if (available === 0) return alert("Item is not available");
                  setQuantity((prev) => Math.min(prev + 1, available));
                }}
                className={`px-3 py-1 text-white hover:bg-gray-700 ${
                  available === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={available === 0}
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <p className="mt-4 text-white font-semibold">
            Total: Rs. <span className="text-green-400"> {subtotal}</span>
          </p>
        </div>

        <button
          onClick={handleBuy}
          className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
