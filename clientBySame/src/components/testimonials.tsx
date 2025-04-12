"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Sample testimonial data
const testimonials = [
  {
    id: 'testimonial1',
    name: 'Yuki Tanaka',
    avatar: '/logo.svg', // Replace with actual avatar in real app
    rating: 5,
    text: "The quality of the figurines I received is incredible! The attention to detail on Tanjiro's sword is beyond what I expected. Will definitely shop here again!",
    product: "Demon Slayer Collection",
  },
  {
    id: 'testimonial2',
    name: 'Alex Chen',
    avatar: '/logo.svg',
    rating: 5,
    text: "I've ordered from many anime shops before, but this marketplace stands out. Shipping was fast, products were well-packaged, and the customer service was exceptional.",
    product: "Attack on Titan Hoodie",
  },
  {
    id: 'testimonial3',
    name: 'Mika Rodriguez',
    avatar: '/logo.svg',
    rating: 4,
    text: "The limited edition One Piece figurine I purchased looks exactly like the pictures. Only giving 4 stars because shipping took a bit longer than expected, but the quality is worth it!",
    product: "Luffy Gear 5 Figure",
  },
  {
    id: 'testimonial4',
    name: 'Hiroshi Watanabe',
    avatar: '/logo.svg',
    rating: 5,
    text: "As a collector for over 10 years, I can honestly say this is one of the best anime shops I've found online. The Jujutsu Kaisen poster set was perfectly printed and arrived in mint condition.",
    product: "Jujutsu Kaisen Posters",
  },
  {
    id: 'testimonial5',
    name: 'Emma Johnson',
    avatar: '/logo.svg',
    rating: 5,
    text: "My boyfriend is obsessed with the Zoro katana replica I bought him! The quality is amazing for the price, and it looks just like in the anime. This store has gained a lifetime customer!",
    product: "Zoro's Wado Ichimonji",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-anime-deepPurple/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-anime-deepPurple/10 text-anime-neonPurple mb-3">
            Otaku Voices
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 text-center">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Join thousands of satisfied anime enthusiasts who have found their perfect collectibles in our marketplace.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full p-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="border border-anime-deepPurple/20 h-full shadow-sm hover:shadow-md hover:border-anime-neonPurple/30 transition-all duration-300">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-anime-deepPurple/30 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                              {testimonial.avatar ? (
                                <Image
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              ) : (
                                <User className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.product}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < testimonial.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex-grow">
                          <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                        </div>

                        {/* Decorative anime-style element */}
                        <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-anime-neonPurple/30 to-transparent" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-6">
            <CarouselPrevious className="relative left-0 right-0 translate-x-0 h-9 w-9 rounded-full border-anime-deepPurple/30 bg-background/80 hover:bg-background hover:text-anime-neonPurple" />
            <CarouselNext className="relative left-0 right-0 translate-x-0 h-9 w-9 rounded-full border-anime-deepPurple/30 bg-background/80 hover:bg-background hover:text-anime-neonPurple" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
