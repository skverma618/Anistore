import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/hero-slider";
import FeaturedProducts from "@/components/featured-products";
import PopularAnime from "@/components/popular-anime";
import FlashSale from "@/components/flash-sale";
import ExploreByAnime from "@/components/explore-by-anime";
import WhyBuyFromUs from "@/components/why-buy-from-us";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <FeaturedProducts />
      <PopularAnime />
      <FlashSale />
      <ExploreByAnime />
      <WhyBuyFromUs />
      <Testimonials />
    </div>
  );
}
