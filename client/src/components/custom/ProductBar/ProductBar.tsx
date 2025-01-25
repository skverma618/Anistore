import React, { useState } from "react";
import "./ProductBar.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import StoreData from "@/dummyData/StoreData";

import ProductCard from "@/components/ProductCard1";

const ProductBar = () => {

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // const cartItems = useSelector((state) => state.cart.items);

  // const handleAddToCart = (product) => {
  //   const productInCart = cartItems.find(
  //     (item) => item.productID === product.productID
  //   );

  //   if (productInCart && productInCart.quantity >= 20) {
  //     toast.error("Product limit reached", {
  //       duration: 2000,
  //       style: {
  //         backgroundColor: "#ff4b4b",
  //         color: "white",
  //       },
  //       iconTheme: {
  //         primary: "#fff",
  //         secondary: "#ff4b4b",
  //       },
  //     });
  //   } else {
  //     dispatch(addToCart(product));
  //     toast.success(`Added to cart!`, {
  //       duration: 2000,
  //       style: {
  //         backgroundColor: "#07bc0c",
  //         color: "white",
  //       },
  //       iconTheme: {
  //         primary: "#fff",
  //         secondary: "#07bc0c",
  //       },
  //     });
  //   }
  // };

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Limited <span>Edition</span>
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <FaAngleRight />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <FaAngleLeft />
          </div>
          <Swiper
            slidesPerView={5}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
            {StoreData.slice(2, 13).map((product) => {
              return (
                <SwiperSlide key={product.productID}>
                  <div className="lpContainer">
                    <ProductCard
                      name={product.productName}
                      price={product.productPrice}
                      image={product?.frontImg}
                      brand="Souled Store"
                      key={product.productID} className="rounded-xl bg-muted/50" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductBar;
