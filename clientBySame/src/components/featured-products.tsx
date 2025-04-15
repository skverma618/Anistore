"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/product-card';

// Sample product data (in a real app, this would come from an API or database)
const featuredProducts = [
  {
    id: "product1",
    name: "Zoro's Wado Ichimonji Katana Replica",
    price: 129.99,
    originalPrice: 159.99,
    image: "/assets/products/one_piece_wallet.jpeg",
    anime: "One Piece",
    category: "Weapon Replicas",
    isHot: true,
  },
  {
    id: "product2",
    name: "Itachi Uchiha Premium Hoodie",
    price: 59.99,
    image: "/assets/products/anime-unisex-regular-itachi-quote-black-t-shirt-2023-product-images-rvkeunghn2-0-202301281426.jpeg",
    anime: "Naruto",
    category: "Clothing",
    isNew: true,
  },
  {
    id: "product3",
    name: "Tanjiro Kamado Figurine",
    price: 79.99,
    originalPrice: 99.99,
    image: "/assets/products/nezuko_figurine1.avif",
    anime: "Demon Slayer",
    category: "Figurines",
    isLimited: true,
  },
  {
    id: "product4",
    name: "My Hero Academia Deku Sneakers",
    price: 89.99,
    image: "/assets/products/jjk_crocs_accessories.webp",
    anime: "My Hero Academia",
    category: "Footwear",
    isSoldOut: true,
  },
];

const FeaturedProducts = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
              Our Collection
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center text-anime-neonPurple font-medium mt-4 md:mt-0 hover:text-anime-deepPurple transition-colors"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="katana-divider my-10">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center">
            <motion.div
              className="w-2 h-2 bg-anime-neonPurple rounded-full"
              animate={{
                boxShadow: ['0 0 5px #a239ca', '0 0 20px #a239ca', '0 0 5px #a239ca']
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
