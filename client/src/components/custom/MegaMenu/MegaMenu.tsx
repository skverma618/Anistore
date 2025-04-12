import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingBagLine, RiMenu2Line } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import logo1 from "@/assets/logo1.png";
import './MegaMenu.css';

// Navigation structure
const navigationData = {
  clothing: {
    title: 'Clothing',
    subcategories: {
      men: {
        title: 'Men',
        items: ['T-Shirts', 'Hoodies', 'Pants', 'Shorts', 'Innerwear']
      },
      women: {
        title: 'Women',
        items: ['Tops', 'Dresses', 'Pants', 'Innerwear']
      },
      kids: {
        title: 'Kids',
        items: ['T-Shirts', 'Pajamas', 'Hoodies']
      }
    }
  },
  accessories: {
    title: 'Accessories',
    subcategories: {
      jewelry: {
        title: 'Jewelry',
        items: ['Earrings', 'Rings']
      },
      props: {
        title: 'Props',
        items: ['Katanas', 'Headbands']
      },
      bags: {
        title: 'Bags',
        items: ['Backpacks', 'Sling']
      },
      others: {
        title: 'Others',
        items: ['Bottles', 'Tech Accessories']
      }
    }
  },
  costumes: {
    title: 'Costumes',
    subcategories: {
      fullSets: {
        title: 'Full Sets',
        items: ['Men', 'Women', 'Kids']
      },
      partialSets: {
        title: 'Partial Sets',
        items: ['Cloaks', 'Robes', 'Shoes']
      }
    }
  },
  posters: {
    title: 'Posters & Art',
    subcategories: {
      types: {
        title: 'Types',
        items: ['Wall Posters', 'Magnetic Posters', '3D Posters', 'Scrolls']
      }
    }
  },
  stickers: {
    title: 'Stickers',
    subcategories: {
      usage: {
        title: 'Usage',
        items: ['Laptop', 'Bottle', 'Wall', 'Others']
      }
    }
  },
  toys: {
    title: 'Toys & Figures',
    subcategories: {
      types: {
        title: 'Types',
        items: ['Plushies', 'Action Figures', 'Collectibles']
      }
    }
  },
  homeDecor: {
    title: 'Home & Decor',
    subcategories: {
      items: {
        title: 'Items',
        items: ['Rugs', 'Pillows', 'Lamps']
      }
    }
  },
  mangas: {
    title: 'Mangas',
    subcategories: {
      comingSoon: {
        title: 'Coming Soon',
        items: []
      }
    }
  },
  combos: {
    title: 'Combos & Merch Boxes',
    subcategories: {}
  },
  shopByAnime: {
    title: 'Shop by Anime',
    subcategories: {
      popular: {
        title: 'Popular Series',
        items: ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball']
      }
    }
  },
  trending: {
    title: 'New & Trending',
    subcategories: {}
  },
  sales: {
    title: 'Sales & Offers',
    subcategories: {}
  }
};

const MegaMenu: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const handleCategoryHover = (category: string) => {
    setActiveCategory(category);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const navigateToCategory = (category: string, subcategory?: string, item?: string) => {
    let path = '';
    
    if (item) {
      path = `${category}-${subcategory}-${item}`.toLowerCase().replace(/\s+/g, '-');
    } else if (subcategory) {
      path = `${category}-${subcategory}`.toLowerCase().replace(/\s+/g, '-');
    } else {
      path = category.toLowerCase().replace(/\s+/g, '-');
    }
    
    navigate(`/${path}`);
    if (mobileMenuOpen) toggleMobileMenu();
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="mega-menu-container">
        <div className="mega-menu-top">
          <div className="logo-container">
            <NavLink to="/">
              <img src={logo1} alt="AniStore Logo" className="w-32" />
            </NavLink>
          </div>
          
          <div className="search-container">
            <input type="text" placeholder="Search for anime products..." />
            <FiSearch className="search-icon" />
          </div>
          
          <div className="icons-container">
            <NavLink to="/wishlist" className="icon-wrapper">
              <FiHeart size={20} />
              <span className="icon-badge">0</span>
            </NavLink>
            <NavLink to="/account" className="icon-wrapper">
              <FaRegUser size={20} />
            </NavLink>
            <NavLink to="/cart" className="icon-wrapper">
              <RiShoppingBagLine size={20} />
              <span className="icon-badge">0</span>
            </NavLink>
          </div>
          
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <MdOutlineClose size={24} /> : <RiMenu2Line size={24} />}
          </div>
        </div>
        
        <div className="mega-menu-nav">
          <ul className="mega-menu-categories">
            {Object.entries(navigationData).map(([key, category]) => (
              <li 
                key={key}
                className="mega-menu-category"
                onMouseEnter={() => handleCategoryHover(key)}
                onMouseLeave={handleCategoryLeave}
              >
                <button onClick={() => navigateToCategory(category.title)}>
                  {category.title}
                </button>
                
                {activeCategory === key && Object.keys(category.subcategories).length > 0 && (
                  <div className="mega-menu-dropdown">
                    <div className="mega-menu-content">
                      {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                        <div key={subKey} className="mega-menu-column">
                          <h3 onClick={() => navigateToCategory(category.title, subcategory.title)}>
                            {subcategory.title}
                          </h3>
                          <ul>
                            {subcategory.items.map((item, index) => (
                              <li key={index} onClick={() => navigateToCategory(category.title, subcategory.title, item)}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-mega-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-mega-menu-header">
          <div className="mobile-search-container">
            <input type="text" placeholder="Search for anime products..." />
            <FiSearch className="mobile-search-icon" />
          </div>
        </div>
        
        <div className="mobile-mega-menu-content">
          <div className="mobile-mega-menu-categories">
            {Object.entries(navigationData).map(([key, category]) => (
              <div key={key} className="mobile-mega-category">
                <div 
                  className="mobile-mega-category-header"
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                >
                  <span>{category.title}</span>
                  <span className={`mobile-mega-arrow ${activeCategory === key ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {activeCategory === key && (
                  <div className="mobile-mega-subcategories">
                    {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                      <div key={subKey} className="mobile-mega-subcategory">
                        <h4 onClick={() => navigateToCategory(category.title, subcategory.title)}>
                          {subcategory.title}
                        </h4>
                        <ul>
                          {subcategory.items.map((item, index) => (
                            <li 
                              key={index} 
                              onClick={() => navigateToCategory(category.title, subcategory.title, item)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mobile-mega-menu-footer">
          <NavLink to="/account" className="mobile-mega-menu-account" onClick={toggleMobileMenu}>
            <FaRegUser size={20} />
            <span>My Account</span>
          </NavLink>
          <NavLink to="/wishlist" className="mobile-mega-menu-wishlist" onClick={toggleMobileMenu}>
            <FiHeart size={20} />
            <span>Wishlist</span>
          </NavLink>
          <NavLink to="/cart" className="mobile-mega-menu-cart" onClick={toggleMobileMenu}>
            <RiShoppingBagLine size={20} />
            <span>Cart</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;