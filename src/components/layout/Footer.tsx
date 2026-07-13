import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{SITE_NAME}</h3>
            <p className="text-sm">
              Your premium destination for stylish and comfortable footwear.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition">All Shoes</Link></li>
              <li><Link href="/shop?category=men" className="hover:text-white transition">Men</Link></li>
              <li><Link href="/shop?category=women" className="hover:text-white transition">Women</Link></li>
              <li><Link href="/shop?category=kids" className="hover:text-white transition">Kids</Link></li>
              <li><Link href="/size-guide" className="hover:text-white transition">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition">Track Order</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: +92 300 1234567</li>
              <li>Email: info@shoesy.com</li>
              <li>Cash on Delivery</li>
              <li>Free shipping on orders over Rs. 2,000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
