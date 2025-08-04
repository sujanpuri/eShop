"use client";

import Image from "next/image";
import { useItems } from "../../context/ItemContext.js";

export default function ProductPage() {
  const { items, error } = useItems();

  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!items) return <p className="p-4">Loading products in background...</p>;

  // Group products by category
  const productsByCategory = items.reduce((acc, product) => {
    const cat = product.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="mb-10">
          {console.log("products:", products)}
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(({ _id, name, price, image }) => (
              <div
                key={_id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                {/* {console.log("Product:", { _id, name, price, images })} */}
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover mb-3 rounded"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-3 rounded">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-green-600 font-semibold">
                  Rs. {price?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
