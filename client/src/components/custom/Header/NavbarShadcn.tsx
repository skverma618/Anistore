import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo1 from "@/assets/logo1.png";

import { RiMenu2Line } from "react-icons/ri";
// import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

// social Links imports Icons
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import { SearchBar } from "@/components/ui/search-bar";
// import { Button } from "@/components/ui/button";

const NavbarShadcn = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-40 py-8 shadow-md">
        <div className="flex items-center gap-16">
          <div className="flex items-center justify-center">
            <NavLink to="/" onClick={scrollToTop}>
              <img src={logo1} alt="Logo" className="w-32" />
            </NavLink>
          </div>
          <div>
            <ul className="flex items-center gap-10">
              <li>
                <NavLink 
                  to="/" 
                  onClick={scrollToTop}
                  className="relative text-[#1b1b1b] no-underline hover:after:w-[86%] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#1b1b1b] after:transition-[width] after:duration-300 after:ease-out hover:after:delay-100"
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shop" 
                  onClick={scrollToTop}
                  className="relative text-[#1b1b1b] no-underline hover:after:w-[86%] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#1b1b1b] after:transition-[width] after:duration-300 after:ease-out hover:after:delay-100"
                >
                  SHOP
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/blog" 
                  onClick={scrollToTop}
                  className="relative text-[#1b1b1b] no-underline hover:after:w-[86%] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#1b1b1b] after:transition-[width] after:duration-300 after:ease-out hover:after:delay-100"
                >
                  BLOG
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  onClick={scrollToTop}
                  className="relative text-[#1b1b1b] no-underline hover:after:w-[86%] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#1b1b1b] after:transition-[width] after:duration-300 after:ease-out hover:after:delay-100"
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="relative text-[#1b1b1b] no-underline hover:after:w-[86%] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#1b1b1b] after:transition-[width] after:duration-300 after:ease-out hover:after:delay-100"
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-64">
            <SearchBar />
          </div>
          <div className="flex items-center justify-center gap-8">
            <NavLink to="/loginSignUp" onClick={scrollToTop} className="flex items-center justify-center text-black no-underline">
              <FaRegUser size={17} />
            </NavLink>
            <NavLink to="/cart" onClick={scrollToTop} className="flex items-center justify-center text-black no-underline">
              <RiShoppingBagLine size={18} />
            </NavLink>
            <button className="bg-transparent border-none p-0 cursor-pointer" onClick={scrollToTop}>
              <FiHeart size={18} className="text-black" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav className="md:hidden">
        <div className="flex items-center justify-between bg-white p-4 z-10 relative">
          <button className="bg-transparent border-none p-0 cursor-pointer" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <MdOutlineClose size={18} />
            ) : (
              <RiMenu2Line size={18} />
            )}
          </button>
          <div className="flex items-center justify-center">
            <NavLink to="/">
              <img src={logo1} alt="Logo" className="w-28" />
            </NavLink>
          </div>
          <NavLink to="/cart" className="text-black no-underline">
            <RiShoppingBagLine size={18} />
          </NavLink>
        </div>
        
        <div className={`fixed inset-0 top-[60px] z-50 flex flex-col gap-16 bg-white transition-transform duration-300 ease-out border-t border-gray-200 ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}>
          <div className="flex flex-col">
            <div className="p-5">
              <SearchBar />
            </div>
            <ul className="m-0 p-0 border-b border-gray-200">
              <li className="p-5">
                <NavLink to="/" onClick={toggleMobileMenu} className="text-[#1b1b1b] no-underline">
                  HOME
                </NavLink>
              </li>
              <li className="p-5">
                <NavLink to="/shop" onClick={toggleMobileMenu} className="text-[#1b1b1b] no-underline">
                  SHOP
                </NavLink>
              </li>
              <li className="p-5">
                <NavLink to="/blog" onClick={toggleMobileMenu} className="text-[#1b1b1b] no-underline">
                  BLOG
                </NavLink>
              </li>
              <li className="p-5">
                <NavLink to="/about" onClick={toggleMobileMenu} className="text-[#1b1b1b] no-underline">
                  ABOUT
                </NavLink>
              </li>
              <li className="p-5">
                <NavLink to="/contact" onClick={toggleMobileMenu} className="text-[#1b1b1b] no-underline">
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8 p-5">
            <div>
              <NavLink to="/loginSignUp" onClick={toggleMobileMenu} className="flex items-center gap-2 text-black no-underline">
                <FaRegUser size={18} />
                <p className="m-0 uppercase">My Account</p>
              </NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-8">
                <p className="m-0">Language</p>
                <select name="language" id="language" className="border-none bg-transparent outline-none">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="flex items-center gap-8">
                <p className="m-0">Currency</p>
                <select name="currency" id="currency" className="border-none bg-transparent outline-none">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8 mb-5">
              <button className="bg-transparent border-none p-0 cursor-pointer">
                <FaFacebookF />
              </button>
              <button className="bg-transparent border-none p-0 cursor-pointer">
                <FaXTwitter />
              </button>
              <button className="bg-transparent border-none p-0 cursor-pointer">
                <FaInstagram />
              </button>
              <button className="bg-transparent border-none p-0 cursor-pointer">
                <FaYoutube />
              </button>
              <button className="bg-transparent border-none p-0 cursor-pointer">
                <FaPinterest />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarShadcn;