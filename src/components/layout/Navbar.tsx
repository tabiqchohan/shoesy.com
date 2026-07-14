"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { SITE_NAME } from "@/lib/constants";

const categories = [
  { name: "Men", href: "/shop?category=men" },
  { name: "Women", href: "/shop?category=women" },
  { name: "Kids", href: "/shop?category=kids" },
  { name: "Sports", href: "/shop?category=sports" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const itemCount = useCartStore((s) => s.getItemCount());
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const catDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catDropdownRef.current && !catDropdownRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <svg className="w-7 h-7 lg:w-8 lg:h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="8" fill="#111827"/>
              <path d="M18 38c-4-2-8-1-12 1-2 1-4 3-5 5l-3 5c-1 1 0 3 1 3h18c2 0 4-2 4-4v-7c0-2-1-3-3-3z" fill="white"/>
              <path d="M12 30c-3 0-5 1-7 2-2 2-4 4-4 7 0 2 1 3 2 4l3-6c1-2 3-3 5-3l3 1-2-5z" fill="white" opacity="0.8"/>
              <rect x="6" y="41" width="24" height="5" rx="2" fill="white"/>
              <circle cx="10" cy="46" r="2" fill="#374151"/>
              <circle cx="22" cy="46" r="2" fill="#374151"/>
            </svg>
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900">{SITE_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={catDropdownRef}>
              <button
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Categories
                <svg
                  className={`w-4 h-4 transition ${catDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {catDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 animate-in fade-in">
                  <Link
                    href="/shop"
                    onClick={() => setCatDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    All Shoes
                  </Link>
                  <div className="border-t mx-3 my-1" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setCatDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/shop"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/wishlist"
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            <Link
              href="/cart"
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition relative"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Login / Profile */}
            {status === "authenticated" ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Profile"
                >
                  <div className="w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      My Orders
                    </Link>
                    <div className="border-t mx-3 my-1" />
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                aria-label="Sign In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 lg:pb-6">
            <form action="/shop" method="GET" className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shoes, brands, categories..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm"
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t pt-4 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
              onClick={closeMobileMenu}
            >
              All Shoes
            </Link>
            <div className="border-t mx-4 my-2" />
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition"
                onClick={closeMobileMenu}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t mx-4 my-2" />
            <Link
              href="/about"
              className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <div className="border-t mx-4 my-2" />
            {status === "authenticated" ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </Link>
                <Link
                  href="/profile/orders"
                  className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition"
                  onClick={closeMobileMenu}
                >
                  My Orders
                </Link>
                <button
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
