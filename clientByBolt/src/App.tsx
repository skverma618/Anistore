import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Star, ChevronRight, ChevronLeft, Timer, Truck, Shield, Gift } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="bg-black/95 text-white sticky top-0 z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AnimeStore
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
                  <a href="#" className="hover:text-purple-400 transition-colors">Shop</a>
                  <a href="#" className="hover:text-purple-400 transition-colors">Best Sellers</a>
                  <a href="#" className="hover:text-purple-400 transition-colors">Offers</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your favorite anime..."
                  className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Heart className="h-6 w-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
              <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-purple-500 cursor-pointer transition-colors" />
              <User className="h-6 w-6 text-gray-300 hover:text-purple-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-out" 
          style={{ width: `${totalSlides * 100}%`, transform: `translateX(-${(100 / totalSlides) * currentSlide}%)` }}
        >
          {/* Slide 1 */}
          <div className="relative w-full h-full">
            <div className="relative h-full bg-gradient-to-r from-purple-900 via-black to-pink-900">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
              <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Discover Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Anime Style
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Exclusive collection of authentic anime merchandise, from iconic weapons to stylish apparel.
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative w-full h-full">
            <div className="relative h-full bg-gradient-to-r from-blue-900 via-black to-indigo-900">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
              <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Limited Edition
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    Collector Items
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Get your hands on rare collectibles from your favorite anime series.
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105">
                  View Collection
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative w-full h-full">
            <div className="relative h-full bg-gradient-to-r from-red-900 via-black to-orange-900">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627307857540-0901a4e0a4ee?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
              <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  New Arrivals
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                    Weekly Drops
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Fresh merchandise drops every week. Don't miss out on the latest releases!
                </p>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all transform hover:scale-105">
                  Check New Drops
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => goToSlide('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={() => goToSlide('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900/50 border-y border-purple-500/20 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center space-x-4">
              <Truck className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Free Shipping</h3>
                <p className="text-gray-400 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Shield className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Secure Payment</h3>
                <p className="text-gray-400 text-sm">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Timer className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Fast Delivery</h3>
                <p className="text-gray-400 text-sm">3-5 business days</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Gift className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Special Gifts</h3>
                <p className="text-gray-400 text-sm">On special occasions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anime Collections */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Popular Anime
          <span className="block text-2xl text-purple-400 font-normal mt-2">Choose your favorite series</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Attack on Titan', 'Dragon Ball Z', 'Hunter X Hunter', 'Bleach', 'One Piece', 'Demon Slayer'].map((anime) => (
            <div key={anime} className="group relative overflow-hidden rounded-lg bg-gray-900 aspect-square hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <img
                src={`https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80`}
                alt={anime}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-center">{anime}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Timer */}
      <section className="bg-gradient-to-r from-purple-900/50 via-black to-pink-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Flash Sale Ends In</h2>
          <div className="flex justify-center space-x-4">
            {['12', '05', '32', '45'].map((time, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold text-purple-400">{time}</div>
                <div className="text-sm text-gray-400">{['Hours', 'Minutes', 'Seconds'][index]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Products</h2>
          <button className="flex items-center text-purple-400 hover:text-purple-300">
            View All <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              name: "Zoro's Katana",
              price: "$299.99",
              image: "https://images.unsplash.com/photo-1589187775328-598e94696649?auto=format&fit=crop&q=80",
              discount: "-40%"
            },
            {
              name: "Tanjiro's Haori",
              price: "$89.99",
              image: "https://images.unsplash.com/photo-1589187775328-598e94696649?auto=format&fit=crop&q=80",
              discount: "-25%"
            },
            {
              name: "Naruto Headband",
              price: "$24.99",
              image: "https://images.unsplash.com/photo-1589187775328-598e94696649?auto=format&fit=crop&q=80",
              discount: "-30%"
            },
            {
              name: "Goku's Power Pole",
              price: "$199.99",
              image: "https://images.unsplash.com/photo-1589187775328-598e94696649?auto=format&fit=crop&q=80",
              discount: "-35%"
            }
          ].map((product, index) => (
            <div key={index} className="group bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  {product.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-300 ml-2">4.9</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">Limited Edition</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">{product.price}</span>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-purple-900/30 via-black to-pink-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Ninja Clan!</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive offers, early access to new collections, and special discounts!
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white px-6 py-3 rounded-r-lg hover:bg-purple-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;