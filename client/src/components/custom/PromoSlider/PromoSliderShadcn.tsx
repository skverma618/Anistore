import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Note: CSS imports are handled in the main CSS file
import { cn } from '@/lib/utils';

interface PromoSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  link: string;
  color: string;
}

import bannerImage from '@/assets/banner/9584068.jpg';
import limitedImage1 from '@/assets/LimitedEdition/limited-1.jpg';
import limitedImage2 from '@/assets/LimitedEdition/limited-2.jpg';
import limitedImage3 from '@/assets/LimitedEdition/limited-3.jpg';

const promoSlides: PromoSlide[] = [
  {
    id: 1,
    title: "Limited Edition Collections",
    subtitle: "Exclusive anime merchandise you won't find anywhere else",
    buttonText: "Shop Now",
    image: bannerImage,
    link: "/limited-edition",
    color: "#ff4081"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh drops from your favorite anime series",
    buttonText: "Explore",
    image: limitedImage1,
    link: "/new-arrivals",
    color: "#3f51b5"
  },
  {
    id: 3,
    title: "Special Offers",
    subtitle: "Up to 50% off on selected merchandise",
    buttonText: "View Deals",
    image: limitedImage2,
    link: "/offers",
    color: "#4caf50"
  },
  {
    id: 4,
    title: "Exclusive Combos",
    subtitle: "Curated collections at special bundle prices",
    buttonText: "Shop Combos",
    image: limitedImage3,
    link: "/combos",
    color: "#ff9800"
  }
];

// Custom styles for Swiper navigation and pagination
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.2rem;
  }

  .swiper-pagination-bullet {
    background-color: white;
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background-color: white;
    opacity: 1;
  }
`;

interface PromoSliderProps {
  className?: string;
}

const PromoSliderShadcn: React.FC<PromoSliderProps> = ({ className }) => {
  return (
    <div className={cn("w-full overflow-hidden mb-8", className)}>
      <style>{swiperStyles}</style>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[400px] md:h-[400px]"
      >
        {promoSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="max-w-[90%] md:max-w-[500px] p-6 md:p-8 bg-black/60 rounded-lg ml-[5%] text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-base md:text-lg mb-6 opacity-90">{slide.subtitle}</p>
                <a 
                  href={slide.link} 
                  className="inline-block px-6 py-3 rounded font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: slide.color }}
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromoSliderShadcn;