"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface SlideProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  btnText: string;
  color: string;
}

const slides: SlideProps[] = [
  {
    id: 'slide1',
    title: "Zoro's Legendary Katana",
    description: "Wield the power of Roronoa Zoro with this meticulously crafted replica. Perfect for collectors and cosplayers alike.",
    imageSrc: "https://cdn11.bigcommerce.com/s-iut5ld55uy/images/stencil/1280x1280/products/35735/171161/SS3140_01__11745.1706628740.jpg",
    href: "/product/zoro-katana",
    btnText: "Shop Now",
    color: "from-green-500/40 via-green-700/30 to-transparent"
  },
  {
    id: 'slide2',
    title: "Limited Edition Itachi Hoodie",
    description: "Embrace the darkness with our exclusive Itachi collection. Premium quality for the ultimate Naruto fan.",
    imageSrc: "https://m.media-amazon.com/images/I/61ZGv25IqdL._AC_UY1000_.jpg",
    href: "/product/itachi-hoodie",
    btnText: "View Collection",
    color: "from-red-500/40 via-red-700/30 to-transparent"
  },
  {
    id: 'slide3',
    title: "Deku's Hero Sneakers",
    description: "Step into heroism with these My Hero Academia inspired sneakers. Comfort meets style for everyday adventures.",
    imageSrc: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/best-anime-collectibles.jpg",
    href: "/product/deku-sneakers",
    btnText: "Explore Now",
    color: "from-blue-500/40 via-blue-700/30 to-transparent"
  }
];

const HeroSlider = () => {
  return (
    <div className="relative overflow-hidden bg-anime-black">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="overflow-hidden">
              <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-anime-black via-anime-black/70 to-transparent z-10" />

                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Content container */}
                <div className="relative h-full z-20 container mx-auto px-4 md:px-6 flex flex-col justify-center">
                  <div className="max-w-xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-2"
                    >
                      <div className="inline-block bg-anime-neonPurple/80 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium">
                        Featured Item
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Button asChild className="bg-anime-neonPurple hover:bg-anime-deepPurple text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(162,57,202,0.5)] relative overflow-hidden group">
                        <Link href={slide.href} className="flex items-center gap-2">
                          {slide.btnText}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-anime-neonPurple/20 blur-3xl z-0"></div>
                <div className="absolute right-32 top-32 w-24 h-24 rounded-full bg-anime-deepPurple/20 blur-2xl z-0"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="container mx-auto px-4 md:px-6 relative">
          <CarouselPrevious className="absolute left-4 z-30 h-12 w-12 rounded-full border-anime-neonPurple/50 bg-background/80 backdrop-blur-sm hover:bg-background hover:text-anime-neonPurple" />
          <CarouselNext className="absolute right-4 z-30 h-12 w-12 rounded-full border-anime-neonPurple/50 bg-background/80 backdrop-blur-sm hover:bg-background hover:text-anime-neonPurple" />
        </div>
      </Carousel>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent z-20"></div>
    </div>
  );
};

export default HeroSlider;
