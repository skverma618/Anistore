import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingBagLine, RiMenu2Line } from 'react-icons/ri';
import logo1 from "@/assets/logo1.png";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Navigation structure - removed mangas, combos, trending, and sales
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
  shopByAnime: {
    title: 'Shop by Anime',
    subcategories: {
      popular: {
        title: 'Popular Series',
        items: ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball']
      }
    }
  }
};

const MegaMenuShadcn: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

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
  };

  return (
    <>
      {/* Desktop Menu */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <NavLink to="/" className="flex items-center">
              <img src={logo1} alt="AniStore Logo" className="w-32" />
            </NavLink>
          </div>
          
          <div className="hidden flex-1 max-w-md mx-8 md:block">
            <SearchBar 
              placeholder="Search for products, brands and more" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <NavLink to="/wishlist" className="relative text-gray-700 hover:text-gray-900">
              <FiHeart size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">0</span>
            </NavLink>
            
            <NavLink to="/account" className="text-gray-700 hover:text-gray-900">
              <FaRegUser size={20} />
            </NavLink>
            
            <NavLink to="/cart" className="relative text-gray-700 hover:text-gray-900">
              <RiShoppingBagLine size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">0</span>
            </NavLink>
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <RiMenu2Line size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <SearchBar 
                      placeholder="Search for products, brands and more" 
                    />
                  </div>
                  
                  <div className="flex-1 overflow-auto py-2">
                    {Object.entries(navigationData).map(([key, category]) => (
                      <Collapsible 
                        key={key}
                        open={mobileActiveCategory === key}
                        onOpenChange={() => setMobileActiveCategory(mobileActiveCategory === key ? null : key)}
                      >
                        <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left">
                          <span className="font-medium">{category.title}</span>
                          <span className="text-xs">
                            {mobileActiveCategory === key ? '▼' : '▶'}
                          </span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="pl-4">
                            {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                              <div key={subKey} className="mb-3">
                                <h4 
                                  className="px-4 py-1 font-medium text-sm"
                                  onClick={() => navigateToCategory(category.title, subcategory.title)}
                                >
                                  {subcategory.title}
                                </h4>
                                <ul className="space-y-1">
                                  {subcategory.items.map((item, index) => (
                                    <li 
                                      key={index}
                                      className="px-4 py-1 text-sm text-gray-600 hover:bg-gray-100"
                                      onClick={() => navigateToCategory(category.title, subcategory.title, item)}
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                  
                  <div className="border-t p-4 grid grid-cols-3 gap-2">
                    <NavLink to="/account" className="flex flex-col items-center text-sm text-gray-700">
                      <FaRegUser size={18} />
                      <span className="mt-1">Account</span>
                    </NavLink>
                    <NavLink to="/wishlist" className="flex flex-col items-center text-sm text-gray-700">
                      <FiHeart size={18} />
                      <span className="mt-1">Wishlist</span>
                    </NavLink>
                    <NavLink to="/cart" className="flex flex-col items-center text-sm text-gray-700">
                      <RiShoppingBagLine size={18} />
                      <span className="mt-1">Cart</span>
                    </NavLink>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="hidden border-b md:block">
          <div className="flex items-center px-4 md:px-6">
            {Object.entries(navigationData).map(([key, category]) => (
              <div 
                key={key}
                className="relative"
                onMouseEnter={() => handleCategoryHover(key)}
                onMouseLeave={handleCategoryLeave}
              >
                <DropdownMenu open={activeCategory === key}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-12 px-4 text-sm font-medium"
                      onClick={() => navigateToCategory(category.title)}
                    >
                      {category.title}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-auto p-4 grid grid-cols-4 gap-6"
                    style={{ width: 'auto', maxWidth: '800px' }}
                  >
                    {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                      <div key={subKey} className="w-40">
                        <h3 
                          className="mb-2 font-medium text-sm cursor-pointer hover:text-red-500"
                          onClick={() => navigateToCategory(category.title, subcategory.title)}
                        >
                          {subcategory.title}
                        </h3>
                        <ul className="space-y-1">
                          {subcategory.items.map((item, index) => (
                            <li 
                              key={index}
                              className="text-sm text-gray-600 cursor-pointer hover:text-red-500"
                              onClick={() => navigateToCategory(category.title, subcategory.title, item)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenuShadcn;