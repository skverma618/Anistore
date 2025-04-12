import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Note: CSS imports are handled in the main CSS file
import './PromoSlider.css';

import bannerImage from '@/assets/banner/9584068.jpg';
import limitedImage1 from '@/assets/banner/9584068.jpg';
import limitedImage2 from '@/assets/banner/10052671.jpg';
import limitedImage3 from '@/assets/banner/5638790.jpg';

interface PromoSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  link: string;
  color: string;
}

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

const PromoSlider: React.FC = () => {
  return (
    <div className="promo-slider-container">
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
        className="promo-slider"
      >
        {promoSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="promo-slide" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="promo-content">
                <h2 className="promo-title">{slide.title}</h2>
                <p className="promo-subtitle">{slide.subtitle}</p>
                <a 
                  href={slide.link} 
                  className="promo-button"
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

export default PromoSlider;