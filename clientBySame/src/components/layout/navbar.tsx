"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Search, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Shop',
    href: '/shop',
    subcategories: [
      { title: 'Figurines', href: '/shop/figurines' },
      { title: 'Clothing', href: '/shop/clothing' },
      { title: 'Weapons', href: '/shop/weapons' },
      { title: 'Posters', href: '/shop/posters' },
      { title: 'Accessories', href: '/shop/accessories' },
    ],
  },
  {
    title: 'Best Sellers',
    href: '/best-sellers',
  },
  {
    title: 'Offers',
    href: '/offers',
  },
  {
    title: 'Accessories',
    href: '/accessories',
  },
];

const animes = [
  { name: 'One Piece', href: '/anime/one-piece' },
  { name: 'Naruto', href: '/anime/naruto' },
  { name: 'Demon Slayer', href: '/anime/demon-slayer' },
  { name: 'Jujutsu Kaisen', href: '/anime/jujutsu-kaisen' },
  { name: 'My Hero Academia', href: '/anime/my-hero-academia' },
  { name: 'Dragon Ball', href: '/anime/dragon-ball' },
  { name: 'Attack on Titan', href: '/anime/attack-on-titan' },
];

const Navbar = () => {
  return (
    <header className="border-b border-anime-deepPurple/20 dark:border-anime-neonPurple/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="md:hidden mr-2">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95 backdrop-blur-md border-r border-anime-deepPurple/20">
                <div className="px-2 py-6">
                  <Link href="/" className="flex items-center mb-6">
                    <Image src="/logo.svg" alt="AnimeMarket" width={150} height={40} className="h-auto" />
                  </Link>
                  <nav className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <Link
                          href={category.href}
                          className="block px-3 py-2 text-lg font-medium hover:bg-anime-deepPurple/10 rounded-lg transition"
                        >
                          {category.title}
                        </Link>
                        {category.subcategories && (
                          <div className="pl-4 space-y-1 border-l-2 border-anime-neonPurple/30 ml-4">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.title}
                                href={subcategory.href}
                                className="block px-3 py-1 text-sm hover:text-anime-neonPurple transition"
                              >
                                {subcategory.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="mt-6 border-t border-anime-deepPurple/20 pt-6">
                    <p className="text-sm font-semibold mb-2">Explore by Anime:</p>
                    <div className="space-y-1">
                      {animes.map((anime) => (
                        <Link
                          key={anime.name}
                          href={anime.href}
                          className="block px-3 py-1 text-sm hover:text-anime-neonPurple transition"
                        >
                          {anime.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/logo.svg" alt="AnimeMarket" width={180} height={48} className="h-auto" />
              </motion.div>
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.title}>
                  {category.subcategories ? (
                    <>
                      <NavigationMenuTrigger className="hover:text-anime-neonPurple transition-colors h-10">
                        {category.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.title} className="row-span-1">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subcategory.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subcategory.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={category.href} className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-anime-neonPurple focus:outline-none focus:bg-accent disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      {category.title}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="hidden sm:block relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 pl-3 pr-10 rounded-full text-sm border border-anime-deepPurple/20 bg-background focus:outline-none focus:ring-2 focus:ring-anime-neonPurple/50 focus:border-anime-neonPurple/50 w-40 md:w-60 transition-shadow"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-anime-neonPurple transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-anime-deepPurple/10 hover:text-anime-neonPurple"
              aria-label="Search"
            >
              <Search className="h-5 w-5 block sm:hidden" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-anime-deepPurple/10 hover:text-anime-neonPurple"
              aria-label="Wishlist"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-anime-deepPurple/10 hover:text-anime-neonPurple"
              aria-label="Account"
              asChild
            >
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-anime-deepPurple/10 hover:text-anime-neonPurple relative"
              aria-label="Cart"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold inline-flex items-center justify-center bg-anime-bloodRed text-white rounded-full">3</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Anime filter tabs - Visible on larger screens */}
      <div className="hidden md:block bg-anime-deepPurple/10 dark:bg-anime-deepPurple/30 border-t border-anime-deepPurple/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center overflow-x-auto py-2 space-x-6">
            <span className="text-sm font-semibold whitespace-nowrap">Explore by Anime:</span>
            {animes.map((anime) => (
              <Link
                key={anime.name}
                href={anime.href}
                className="text-sm whitespace-nowrap hover:text-anime-neonPurple transition-colors"
              >
                {anime.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
