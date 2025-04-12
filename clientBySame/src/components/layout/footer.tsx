"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-anime-matteBlack to-anime-black text-white border-t border-anime-deepPurple/30">
      <div className="container mx-auto px-4 md:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/logo.svg" alt="AnimeMarket" width={180} height={48} className="h-auto" />
            </Link>
            <p className="text-sm text-gray-300 mt-4 max-w-sm">
              Built for Otakus by Otakus. Your one-stop shop for all anime merchandise and collectibles.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-anime-neonPurple transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-anime-neonPurple transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-anime-neonPurple transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-anime-neonPurple transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-anime-neonPurple/30">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-anime-neonPurple/30">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/figurines" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Figurines
                </Link>
              </li>
              <li>
                <Link href="/shop/clothing" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/shop/weapons" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Weapon Replicas
                </Link>
              </li>
              <li>
                <Link href="/shop/posters" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Posters & Wall Art
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop/limited" className="text-gray-300 hover:text-anime-neonPurple transition-colors">
                  Limited Editions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-anime-neonPurple/30">Join Our Clan</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers, new arrivals, and anime updates!
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-anime-matteBlack/70 border border-anime-deepPurple/50 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:border-anime-neonPurple"
              />
              <Button className="rounded-l-none bg-anime-neonPurple hover:bg-anime-deepPurple text-white">
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our terms and privacy policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="katana-divider my-8">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
            <div className="w-3 h-3 bg-anime-neonPurple rounded-full shadow-[0_0_10px_#a239ca,0_0_20px_#a239ca]"></div>
          </span>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AnimeMarket. All rights reserved.</p>
          <p className="mt-1">All product names, logos, and brands are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
