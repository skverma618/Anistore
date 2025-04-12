"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlashSale = () => {
  // Initial countdown values (hours, minutes, seconds)
  const [countdown, setCountdown] = useState({
    hours: 12,
    minutes: 5,
    seconds: 32
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              // Reset timer when it reaches zero
              hours = 12;
              minutes = 0;
              seconds = 0;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format numbers to always have two digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-anime-deepPurple/20 via-background to-anime-neonPurple/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
            Limited Time Offer
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-8 text-center">
            Flash Sale Ends In
          </h2>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center space-x-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: formatNumber(countdown.hours), label: 'Hours' },
            { value: formatNumber(countdown.minutes), label: 'Minutes' },
            { value: formatNumber(countdown.seconds), label: 'Seconds' }
          ].map((time, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-card border border-anime-deepPurple/20 rounded-lg p-4 min-w-[80px] shadow-[0_4px_20px_rgba(162,57,202,0.15)]"
            >
              <div className="text-3xl font-bold text-anime-neonPurple">{time.value}</div>
              <div className="text-sm text-muted-foreground">{time.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="bg-anime-deepPurple hover:bg-anime-neonPurple text-white font-medium py-2 px-6 rounded-full transition-colors">
            Shop Flash Sale
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;