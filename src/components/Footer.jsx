import { Facebook, Instagram, TwitchIcon } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold font-anton  mb-2">MemeFits</h2>
          <p className="text-sm text-gray-400">
            Meme T-shirts made to spark laughter. Wear the vibe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="/" className="hover:text-white transition-all">Home</a></li>
            <li><a href="/shop" className="hover:text-white transition-all">Shop</a></li>
            <li><a href="/cart" className="hover:text-white transition-all">Cart</a></li>
            <li><a href="/policy" className="hover:text-white transition-all">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
  <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
  <div className="flex gap-6 text-gray-300">
    
    {/* Instagram */}
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="p-3 bg-gray-800 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-600">
        <Instagram className="text-xl group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <a 
        href="#" 
        className="mt-2 text-sm transition-all duration-300 group-hover:text-pink-400 group-hover:translate-y-1"
      >
        Instagram
      </a>
    </div>
    
    {/* Twitter */}
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="p-3 bg-gray-800 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500">
        <TwitchIcon className="text-xl group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <a 
        href="#" 
        className="mt-2 text-sm transition-all duration-300 group-hover:text-blue-400 group-hover:translate-y-1"
      >
        Twitter
      </a>
    </div>

    {/* Facebook */}
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="p-3 bg-gray-800 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700">
        <Facebook className="text-xl group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <a 
        href="#" 
        className="mt-2 text-sm transition-all duration-300 group-hover:text-blue-400 group-hover:translate-y-1"
      >
        Facebook
      </a>
    </div>

  </div>
</div>

      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} MemeFits. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
