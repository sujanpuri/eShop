"use client";

import Navbar from "../../components/Navbar.js";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">🛍️ About Our Store</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to our eCommerce platform! We’re passionate about providing quality products, 
          smooth shopping experiences, and quick customer support. 
        </p>

        <p className="text-gray-400 mb-4">
          Whether you're a long-time customer or new here, our mission is to bring you great 
          items at fair prices. Our team constantly works to improve the platform and services for you.
        </p>

        <p className="text-gray-500">
          Built with 💻 Next.js, Express.js, MongoDB, and a sprinkle of Tailwind magic. 
          Thank you for supporting us!
        </p>
      </div>
    </div>
  );
}
