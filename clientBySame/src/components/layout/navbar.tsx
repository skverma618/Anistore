"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Search, User, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Navigation structure from client MegaMenu
const navigationData = {
  clothing: {
    title: 'Clothing',
    href: '/products?category=clothing',
    subcategories: {
      men: {
        title: 'Men',
        items: ['T-Shirts', 'Hoodies', 'Pants', 'Shorts', 'Innerwear']
      },
      women: {
        title: 'Women',
        items: ['Tops', 'Dresses', 'Pants', 'Innerwear']
      },
      kids: {
        title: 'Kids',
        items: ['T-Shirts', 'Pajamas', 'Hoodies']
      }
    }
  },
  accessories: {
    title: 'Accessories',
    href: '/products?category=accessories',
    subcategories: {
      jewelry: {
        title: 'Jewelry',
        items: ['Earrings', 'Rings']
      },
      props: {
        title: 'Props',
        items: ['Katanas', 'Headbands']
      },
      bags: {
        title: 'Bags',
        items: ['Backpacks', 'Sling']
      },
      others: {
        title: 'Others',
        items: ['Bottles', 'Tech Accessories']
      }
    }
  },
  costumes: {
    title: 'Costumes',
    href: '/products?category=costumes',
    subcategories: {
      fullSets: {
        title: 'Full Sets',
        items: ['Men', 'Women', 'Kids']
      },
      partialSets: {
        title: 'Partial Sets',
        items: ['Cloaks', 'Robes', 'Shoes']
      }
    }
  },
  collectiblesDecor: {
    title: 'Collectibles & Decor',
    href: '/products?category=collectibles-decor',
    subcategories: {
      stickers: {
        title: 'Stickers',
        items: ['Laptop', 'Bottle', 'Wall', 'Others']
      },
      toys: {
        title: 'Toys & Figures',
        items: ['Plushies', 'Action Figures', 'Collectibles']
      },
      homeDecor: {
        title: 'Home & Decor',
        items: ['Rugs', 'Pillows', 'Lamps']
      },
      posters: {
        title: 'Posters & Art',
        href: '/products?category=collectibles-decor&subcategory=posters',
        subcategories: {
          types: {
            title: 'Types',
            items: ['Wall Posters', 'Magnetic Posters', '3D Posters', 'Scrolls']
          }
        }
      },
    }
  },
  // mangas: {
  //   title: 'Mangas',
  //   href: '/mangas',
  //   subcategories: {
  //     comingSoon: {
  //       title: 'Coming Soon',
  //       items: []
  //     }
  //   }
  // },
  // combos: {
  //   title: 'Combos & Merch Boxes',
  //   href: '/combos-merch-boxes',
  //   subcategories: {}
  // },
  shopByAnime: {
    title: 'Shop by Anime',
    href: '/products?anime=all',
    subcategories: {
      popular: {
        title: 'Popular Series',
        items: ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball']
      }
    }
  }
};

// Convert navigationData to an array for easier mapping
const categories = Object.entries(navigationData).map(([key, category]) => ({
  ...category,
  key
}));

// Extract anime list from navigationData
const animes = navigationData.shopByAnime.subcategories.popular.items.map(anime => ({
  name: anime,
  href: `/products?anime=${anime.toLowerCase().replace(/\s+/g, '-')}`
}));

const Navbar = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
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
                      <div key={category.key} className="space-y-2">
                        <Link
                          href={category.href}
                          className="block px-3 py-2 text-lg font-medium hover:bg-anime-deepPurple/10 rounded-lg transition"
                        >
                          {category.title}
                        </Link>
                        {category.subcategories && Object.keys(category.subcategories).length > 0 && (
                          <div className="pl-3 space-y-0.5 border-l-2 border-anime-neonPurple/30 ml-3">
                            {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                              <div key={subKey}>
                                <Link
                                  href={`${category.href}&subcategory=${subKey.toLowerCase()}`}
                                  className="block px-3 py-1 text-sm font-medium hover:text-anime-neonPurple transition"
                                >
                                  {subcategory.title}
                                </Link>
                                {/* Check if subcategory has items property */}
                                {'items' in subcategory && subcategory.items && subcategory.items.length > 0 && (
                                  <div className="pl-2 ml-1 space-y-0.5">
                                    {subcategory.items.map((item: string, index: number) => (
                                      <Link
                                        key={index}
                                        href={`${category.href}&subcategory=${subKey.toLowerCase()}&item=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="block px-2 py-1 text-xs hover:text-anime-neonPurple transition"
                                      >
                                        {item}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
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
                      <Link
                        href="/products?anime=all"
                        className="block px-3 py-1 text-sm text-anime-neonPurple"
                      >
                        View All →
                      </Link>
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
                <NavigationMenuItem key={category.key}>
                  {category.subcategories && Object.keys(category.subcategories).length > 0 ? (
                    <>
                      <NavigationMenuTrigger className="hover:text-anime-neonPurple transition-colors h-10 data-[state=open]:bg-transparent data-[state=open]:text-anime-neonPurple">
                        {category.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white dark:bg-gray-950 shadow-md rounded-md border border-gray-200 dark:border-gray-800">
                        <div className="p-4 grid gap-3 md:w-[600px] lg:w-[700px] lg:grid-cols-3">
                          {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                            <div key={subKey} className="space-y-2">
                              <Link
                                href={`${category.href}&subcategory=${subKey.toLowerCase()}`}
                                className="text-sm font-medium text-anime-neonPurple hover:underline"
                              >
                                {subcategory.title}
                              </Link>
                              {/* Check if subcategory has items property */}
                              {'items' in subcategory && subcategory.items && subcategory.items.length > 0 && (
                                <ul className="space-y-1">
                                  {subcategory.items.map((item: string, index: number) => (
                                    <li key={index}>
                                      <Link
                                        href={`${category.href}&subcategory=${subKey.toLowerCase()}&item=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-anime-neonPurple transition-colors"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={category.href} className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-anime-neonPurple focus:outline-none disabled:pointer-events-none disabled:opacity-50">
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
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold inline-flex items-center justify-center bg-anime-electricBlue text-white rounded-full">
                    {wishlistCount}
                  </span>
                )}
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
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold inline-flex items-center justify-center bg-anime-bloodRed text-white rounded-full">
                    {cartCount}
                  </span>
                )}
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
            <Link
              href="/products?anime=all"
              className="text-xs whitespace-nowrap text-anime-neonPurple hover:underline"
            >
              View All →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
