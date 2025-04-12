"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Award, PackageCheck, Clock, CreditCard } from 'lucide-react';

// Feature data with icons and descriptions
const features = [
  {
    icon: <Truck className="h-10 w-10 text-anime-neonPurple" />,
    title: "Free Worldwide Shipping",
    description: "On all orders over $100. Fast delivery to your doorstep, no matter where you are."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-anime-neonPurple" />,
    title: "Authenticity Guaranteed",
    description: "All products are 100% authentic with official licensing. No bootlegs here!"
  },
  {
    icon: <Award className="h-10 w-10 text-anime-neonPurple" />,
    title: "Premium Quality",
    description: "Highest quality figurines, clothing, and collectibles that exceed expectations."
  },
  {
    icon: <PackageCheck className="h-10 w-10 text-anime-neonPurple" />,
    title: "Secure Packaging",
    description: "Products carefully packaged to ensure they arrive in perfect condition."
  },
  {
    icon: <Clock className="h-10 w-10 text-anime-neonPurple" />,
    title: "24/7 Support",
    description: "Our team of anime enthusiasts is always here to help with any questions."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-anime-neonPurple" />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy if you're not completely satisfied."
  }
];

const WhyBuyFromUs = () => {
  // Animation variants for elements coming into view
  const containerVariants = {
    hidden: {},
    visible: {
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
    <section className="relative py-16 overflow-hidden">
      {/* Background decoration - subtle gradient with anime style */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-anime-deepPurple/5 to-background -z-10" />

      {/* Decorative element - diagonal line like a katana slash */}
      <div className="absolute w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-anime-neonPurple/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-anime-deepPurple/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
            Why Choose Us
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 text-center">
            Built for Otakus by Otakus
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            We understand the passion anime fans have for their collectibles. That's why we've created a marketplace that puts quality and authenticity first.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={`feature-${index}`}
              variants={itemVariants}
              className="bg-background/80 backdrop-blur-sm border border-anime-deepPurple/20 rounded-lg p-6 hover:border-anime-neonPurple/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-anime-neonPurple transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-xl font-semibold mb-4">
            Join thousands of satisfied anime enthusiasts!
          </p>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button className="bg-anime-neonPurple hover:bg-anime-deepPurple text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-anime-neonPurple/30">
              Shop Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyFromUs;
