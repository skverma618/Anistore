"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Sample anime data
const animeList = [
  'Attack on Titan', 
  'Dragon Ball Z', 
  'Hunter X Hunter', 
  'Bleach', 
  'One Piece', 
  'Demon Slayer'
];

const PopularAnime = () => {
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
        <div className="flex flex-col items-center mb-12">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
            Fan Favorites
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 text-center">
            Popular Anime
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Choose your favorite series
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {animeList.map((anime) => (
            <motion.div 
              key={anime} 
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg bg-card aspect-square hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-anime-black/80 to-transparent"></div>
              <img
                src={`https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80`}
                alt={anime}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-center">{anime}</h3>
              </div>
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

export default PopularAnime;