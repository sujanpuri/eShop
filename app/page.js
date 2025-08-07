"use client";

import Navbar from "./components/Navbar.js";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex pt-27 flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-4 pb-15 gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Discover Products <br />
            You’ll Love 💖
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            A modern eCommerce platform to explore quality items with ease, powered by Next.js & Express.
          </p>

          <Link
            href="/routes/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition text-white font-medium px-6 py-3 rounded-full"
          >
            Start Shopping <ShoppingBag size={18} />
          </Link>
        </div>

        <div className="md:w-1/2">
          <img
            src="/images/cover.png" // You can update this path or use an online image URL
            alt="Shopping Illustration"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-400 text-sm">
              Get your items quickly with our efficient shipping service.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🛡️ Secure Payments</h3>
            <p className="text-gray-400 text-sm">
              Your payment data is encrypted and fully protected.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📦 Easy Returns</h3>
            <p className="text-gray-400 text-sm">
              Not happy? Return or exchange your items within 7 days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
