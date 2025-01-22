import React, { useState } from "react";
import "./Navbar.css";

// import logo from "../../Assets/logo.png";
import { NavLink } from "react-router-dom";
import logo1 from "@/assets/logo1.png";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

// social Links imports Icons

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

// import Badge from "@mui/material/Badge";

const Navbar = () => {
  // const [cart, setCart] = useState([]);

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
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <NavLink to="/" onClick={scrollToTop}>
              <img src={logo1} alt="Logo" className="w-32" />
            </NavLink>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <NavLink to="/" onClick={scrollToTop}>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={scrollToTop}>
                  SHOP
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={scrollToTop}>
                  BLOG
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={scrollToTop}>
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={scrollToTop}>
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={18} onClick={scrollToTop} />
          <NavLink to="/loginSignUp" onClick={scrollToTop}>
            <FaRegUser size={17} />
          </NavLink>
          <NavLink to="/cart" onClick={scrollToTop}>
            <RiShoppingBagLine size={18} />
            {/* <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              // 
            </Badge> */}
          </NavLink>
          <FiHeart size={18} onClick={scrollToTop} />
          {/* <RiMenu2Line size={18} /> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={18} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={18} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <NavLink to="/">
            <img src={logo1} alt="Logo" className="w-28" />
            </NavLink>
          </div>
          <NavLink to="/cart">
            <RiShoppingBagLine size={18} color="black" />
            {/* <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
             
            </Badge> */}
          </NavLink>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <NavLink to="/shop">
                  <FiSearch size={18} onClick={toggleMobileMenu} />
                </NavLink>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li>
                  <NavLink to="/" onClick={toggleMobileMenu}>
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop" onClick={toggleMobileMenu}>
                    SHOP
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" onClick={toggleMobileMenu}>
                    BLOG
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" onClick={toggleMobileMenu}>
                    ABOUT
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={toggleMobileMenu}>
                    CONTACT
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <NavLink to="/loginSignUp" onClick={toggleMobileMenu}>
                <FaRegUser size={18} />
                <p>My Account</p>
              </NavLink>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
