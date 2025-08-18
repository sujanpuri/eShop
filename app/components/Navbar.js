"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Handbag, Menu, ShoppingCart, Loader, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import SearchBar from "./ui/SearchBar";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useItems } from "../context/ItemContext";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // itemroute context
  const { items, setItems } = useItems();
  const { searched, setSearched } = useItems();
  const { backupItems, setBackupItems } = useItems();
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!searched.trim()) {
      setBackupItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(searched.toLowerCase())
      );
      setBackupItems(filtered);
    }
  }, [searched, items]);

  const linkClass = (href) =>
    `hover:text-gray-300 ${
      pathname === href ? "text-blue-400 font-semibold" : "text-white"
    }`;

  return (
    <nav className="bg-gray-900 text-white pb-0 fixed w-full z-50 shadow-md">
      <div className="border-b-[0.5px] py-5 px-3 md:px-6 lg:px-8">
        {/* Desktop View */}
        <div className="flex w-full justify-between md:justify-around items-center">
          {/* LEFT: Logo and Title */}
          <div className="flex items-center space-x-3">
            <Handbag className="w-10 h-10 text-white bg-blue-600 p-2 rounded-full shadow" />
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-gray-200"
            >
              MyShop
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop only) */}
          <div className="hidden md:flex justify-center space-x-6">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link
              href="/routes/products"
              className={linkClass("/routes/products")}
            >
              Products
            </Link>
            {/* <Link href="/routes/categories" className={linkClass("/routes/categories")}>
            Categories
          </Link> */}
            <Link href="/routes/about" className={linkClass("/routes/about")}>
              About
            </Link>
          </div>

          {/* RIGHT: Search, Cart, Profile, Menu */}
          <div className="flex text-white items-center space-x-4">
            <SearchBar className="hidden md:block" />

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-gray-700 transition"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Overlay */}
            {isCartOpen && (
              <div
                onClick={toggleCart}
                className="fixed inset-0 backdrop-blur-sm z-40"
              />
            )}

            {/* Component - Cart Drawer */}
            <div
              className={`fixed top-0 right-[-20px] w-100 h-full bg-gray-800 shadow-lg z-50 p-4 transition-transform duration-300 ${
                isCartOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Cart Header */}
              <div className="flex justify-between">
                <h2 className="font-extrabold text-2xl text-blue-500">Cart</h2>
                <button
                  onClick={toggleCart}
                  className=" text-red-500 hover:bg-red-950 hover:text-white px-1 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <hr className="my-2 mb-5" />

              <div className="max-h-[80vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p>No items in cart.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-3 border-b pb-2"
                    >
                      {/* cart items */}
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="w-16 h-16 object-cover mr-3 rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Rs. {item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Total Price */}
              {cartItems.length > 0 && (
                <div className="mt-4 font-bold flex items-center w-full justify-center">
                  Total: Rs.
                  <div className="text-xl ml-1 text-green-400">
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </div>
                </div>
              )}
            </div>

            {status === "loading" ? (
              <Button
                disabled
                className="hidden md:flex items-center gap-2 px-4 py-1 text-sm h-auto whitespace-nowrap text-center"
              >
                <Loader className="animate-spin w-4 h-4" />
                <p>Loading...</p>
              </Button>
            ) : status === "authenticated" ? (
              <>
                <div className="w-7 h-7 min-w-[24px] min-h-[24px]">
                  <Link
                    href="/routes/profile"
                    className="block hover:text-gray-300"
                  >
                    <Image
                      src={session.user.image}
                      alt="Profile Picture"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  </Link>
                </div>
                <Button
                  onClick={() => {
                    const confirmLogout = window.confirm(
                      "Are you sure you want to sign out?"
                    );
                    if (confirmLogout) signOut();
                  }}
                  variant="danger"
                  className="hidden md:block text-center px-4 py-1 text-sm h-auto whitespace-nowrap"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => signIn("google")}
                className="hidden md:block text-center px-4 py-1 text-sm h-auto whitespace-nowrap hover:text-blue-400"
              >
                Login with Google
              </Button>
            )}

            {/* Menu Icon */}
            <button
              onClick={() => {
                setMenuOpen(!menuOpen), setMenuOpen(!menuOpen);
              }}
              className="md:hidden"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col gap-3 bg-gray-900 text-white"
            >
              <div className="md:hidden space-y-3 px-3">
                {/* Navigations */}
                <div className="flex justify-around items-center mt-5">
                  <Link href="/" className={linkClass("/")}>
                    Home
                  </Link>
                  <Link
                    href="/routes/products"
                    className={linkClass("/routes/products")}
                  >
                    Products
                  </Link>
                  <Link
                    href="/routes/about"
                    className={linkClass("/routes/about")}
                  >
                    About
                  </Link>
                </div>

                <hr className="border-gray-600" />

                {/* Search and Auth Buttons */}
                <div className="flex items-center justify-between">
                  <SearchBar />

                  {status === "authenticated" ? (
                    <>
                      <Button
                        onClick={() => {
                          const confirmLogout = window.confirm(
                            "Are you sure you want to sign out?"
                          );
                          if (confirmLogout) signOut();
                        }}
                        variant="danger"
                        className="text-center px-4 py-1 text-sm h-auto whitespace-nowrap"
                      >
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => signIn("google")}
                      className="text-center px-4 py-1 text-sm h-auto whitespace-nowrap hover:text-blue-400"
                    >
                      Login with Google
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {searched && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 text-white p-4 shadow-md z-0 flex flex-col items-center">
          <div>
            <h2 className="font-bold mb-2">Search results for: "{searched}"</h2>

            {backupItems.length > 0 ? (
              <ul className="flex flex-wrap gap-4 w-[80vw] overflow-y-auto max-h-[80vh]">
                {backupItems.map((item) => (
                  <li
                    key={item._id}
                    className="p-3 border rounded bg-gray-900 shadow-sm flex gap-4 hover:bg-gray-800"
                  >
                    <Link
                      href={{
                        pathname: "/routes/buyNow",
                        query: {
                          id: item._id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          description:
                            item.description || "No description available",
                          category: item.category || "Uncategorized",
                        },
                      }}
                      onClick={() => setSearched("")}
                      className="flex items-center gap-4"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-24 h-24 object-cover mb-2"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500 h-5 overflow-hidden">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items matched your search.</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
