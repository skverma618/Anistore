"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCard from '@/components/ui/product-card';

// Sample anime data with corresponding products
const animeData = [
  {
    id: 'one-piece',
    name: 'One Piece',
    logoSrc: '/logo.svg', // Placeholder, in a real app you'd have actual logos
    products: [
      {
        id: "one-piece-1",
        name: "Zoro's Triple Katana Set",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://cdn11.bigcommerce.com/s-iut5ld55uy/images/stencil/1280x1280/products/35735/171161/SS3140_01__11745.1706628740.jpg",
        anime: "One Piece",
        category: "Weapon Replicas",
        subcategory: "Katanas",
        isHot: true,
        rating: 4.9,
        reviewCount: 65
      },
      {
        id: "one-piece-2",
        name: "Luffy Straw Hat",
        price: 39.99,
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/best-anime-collectibles.jpg",
        anime: "One Piece",
        category: "Accessories",
        subcategory: "Hats",
        isNew: true,
        rating: 4.7,
        reviewCount: 42
      },
      {
        id: "one-piece-3",
        name: "Tony Tony Chopper Plush",
        price: 24.99,
        image: "https://i5.walmartimages.com/seo/Sanrio-Anime-Figure-6Cm-Christmas-Hat-Cinnamoroll-Bear-Figurines-Collectibles-Kawaii-Doll-Toys-Send-A-Gifts-For-Childrens_8d60ec0e-52a6-4743-b1a6-d8dd0b5f6f0f.81ca0704859e014cc339bdd5738e5b40.jpeg",
        anime: "One Piece",
        category: "Plushies",
        subcategory: "Character Plushies",
        rating: 4.8,
        reviewCount: 37
      },
    ]
  },
  {
    id: 'naruto',
    name: 'Naruto',
    logoSrc: '/logo.svg', // Placeholder
    products: [
      {
        id: "naruto-1",
        name: "Akatsuki Cloud Hoodie",
        price: 59.99,
        image: "https://m.media-amazon.com/images/I/61ZGv25IqdL._AC_UY1000_.jpg",
        anime: "Naruto",
        category: "Clothing",
        subcategory: "Hoodies",
        isLimited: true,
        rating: 4.6,
        reviewCount: 53
      },
      {
        id: "naruto-2",
        name: "Kunai Knife Set (3 Pieces)",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://i.ebayimg.com/images/g/1MMAAOSw97RgWfdU/s-l400.jpg",
        anime: "Naruto",
        category: "Weapon Replicas",
        subcategory: "Ninja Tools",
        rating: 4.5,
        reviewCount: 28
      },
      {
        id: "naruto-3",
        name: "Naruto Sage Mode Figure",
        price: 89.99,
        image: "https://360assetadvisors.com/wp-content/uploads/2023/08/UKFeature2.png",
        anime: "Naruto",
        category: "Figurines",
        subcategory: "Action Figures",
        isHot: true,
        rating: 4.9,
        reviewCount: 47
      },
    ]
  },
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    logoSrc: '/logo.svg', // Placeholder
    products: [
      {
        id: "demon-slayer-1",
        name: "Tanjiro's Nichirin Blade",
        price: 119.99,
        image: "https://i.etsystatic.com/26622078/r/il/84b60f/3134063687/il_570xN.3134063687_9qaf.jpg",
        anime: "Demon Slayer",
        category: "Weapon Replicas",
        subcategory: "Swords",
        isNew: true,
        rating: 4.8,
        reviewCount: 32
      },
      {
        id: "demon-slayer-2",
        name: "Nezuko LED Light",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/61hJi82i-xL._AC_UF1000,1000_QL80_.jpg",
        anime: "Demon Slayer",
        category: "Home Decor",
        subcategory: "Lighting",
        rating: 4.6,
        reviewCount: 24
      },
      {
        id: "demon-slayer-3",
        name: "Hashira Collection Set",
        price: 299.99,
        originalPrice: 349.99,
        image: "https://images.ontheedgebrands.com/cdn-cgi/image/f=auto,height=1000,width=1000,quality=75/images/a35-bk6233/miniature-anime-sword-tengen-uzui-replica-with-stand.jpg",
        anime: "Demon Slayer",
        category: "Collectibles",
        subcategory: "Figure Sets",
        isLimited: true,
        rating: 5.0,
        reviewCount: 18
      },
    ]
  },
  {
    id: 'jujutsu-kaisen',
    name: 'Jujutsu Kaisen',
    logoSrc: '/logo.svg', // Placeholder
    products: [
      {
        id: "jujutsu-1",
        name: "Sukuna Finger Replica",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/71JsXCwmC-L._AC_UF894,1000_QL80_.jpg",
        anime: "Jujutsu Kaisen",
        category: "Collectibles",
        subcategory: "Prop Replicas",
        isLimited: true,
        rating: 4.7,
        reviewCount: 29
      },
      {
        id: "jujutsu-2",
        name: "Gojo Satoru Blindfold",
        price: 19.99,
        image: "https://images.ontheedgebrands.com/cdn-cgi/image/f=auto,height=1000,width=1000,quality=75/images/d35-bk6233/demon-slayer-miniature-sword-dimensions.jpg",
        anime: "Jujutsu Kaisen",
        category: "Accessories",
        subcategory: "Cosplay Items",
        isHot: true,
        rating: 4.8,
        reviewCount: 41
      },
      {
        id: "jujutsu-3",
        name: "Domain Expansion Poster Set",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://360assetadvisors.com/wp-content/uploads/2023/08/UKFeature2.png",
        anime: "Jujutsu Kaisen",
        category: "Wall Art",
        subcategory: "Posters",
        rating: 4.5,
        reviewCount: 36
      },
    ]
  },
];

const ExploreByAnime = () => {
  const [selectedAnime, setSelectedAnime] = useState(animeData[0].id);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-anime-deepPurple/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
            Otaku Paradise
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 text-center">
            Explore by Anime
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Dive into your favorite anime universes and discover exclusive merchandise
            from the most popular series.
          </p>
        </div>

        <Tabs
          value={selectedAnime}
          onValueChange={setSelectedAnime}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="h-12 p-1 bg-background border border-anime-deepPurple/20 shadow-[0_2px_10px_rgba(162,57,202,0.1)]">
              {animeData.map((anime) => (
                <TabsTrigger
                  key={anime.id}
                  value={anime.id}
                  className="px-5 h-10 data-[state=active]:bg-anime-deepPurple/10 data-[state=active]:text-anime-neonPurple relative"
                >
                  {anime.name}
                  {anime.id === selectedAnime && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-anime-neonPurple"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-4">
            {animeData.map((anime) => (
              <TabsContent
                key={anime.id}
                value={anime.id}
                className="mt-0 outline-none"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {anime.products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <Link
                        href={`/anime/${anime.id}`}
                        className="inline-flex items-center justify-center bg-anime-deepPurple hover:bg-anime-neonPurple text-white font-medium py-2 px-6 rounded-full transition-colors"
                      >
                        View All {anime.name} Products
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ExploreByAnime;
