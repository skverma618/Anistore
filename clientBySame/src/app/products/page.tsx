"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import MobileFilterDrawer from '@/components/products/mobile-filter-drawer';
import FilterSystem, { ProductFilters } from '@/components/products/filter-system';
import { Product, products, getProductsByCategory, getProductsByAnime } from '@/data/products';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const item = searchParams.get('item');
  const anime = searchParams.get('anime');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({});
  
  // Set page title based on URL parameters
  const getPageTitle = () => {
    if (anime) {
      return `${anime} Products`;
    } else if (item && subcategory && category) {
      return `${item} ${subcategory} - ${category}`;
    } else if (subcategory && category) {
      return `${subcategory} - ${category}`;
    } else if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      return 'All Products';
    }
  };
  
  // Generate breadcrumb items based on URL parameters
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' }
    ];
    
    if (category) {
      breadcrumbs.push({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/products?category=${category}`
      });
    }
    
    if (subcategory) {
      breadcrumbs.push({
        label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
        href: `/products?category=${category}&subcategory=${subcategory}`
      });
    }
    
    if (item) {
      breadcrumbs.push({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        href: `/products?category=${category}&subcategory=${subcategory}&item=${item}`
      });
    }
    
    if (anime) {
      breadcrumbs.push({
        label: anime,
        href: `/products?anime=${anime}`
      });
    }
    
    return breadcrumbs;
  };
  
  // Filter products based on URL parameters and active filters
  useEffect(() => {
    let filtered: Product[] = [];
    
    if (anime) {
      filtered = getProductsByAnime(anime);
    } else if (category) {
      filtered = getProductsByCategory(category, subcategory || undefined, item || undefined);
    } else {
      filtered = products;
    }
    
    // Apply active filters
    if (Object.keys(activeFilters).length > 0) {
      // Filter by price range
      if (activeFilters.price && Array.isArray(activeFilters.price) && activeFilters.price.length === 2) {
        const [min, max] = activeFilters.price as number[];
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      }
      
      // Filter by anime
      if (activeFilters.anime && Array.isArray(activeFilters.anime) && activeFilters.anime.length > 0) {
        filtered = filtered.filter(product =>
          (activeFilters.anime as string[]).includes(product.anime)
        );
      }
      
      // Filter by availability
      if (activeFilters.availability && Array.isArray(activeFilters.availability) && activeFilters.availability.length > 0) {
        filtered = filtered.filter(product => {
          if ((activeFilters.availability as string[]).includes('In Stock') && !product.isSoldOut) {
            return true;
          }
          if ((activeFilters.availability as string[]).includes('Out of Stock') && product.isSoldOut) {
            return true;
          }
          return false;
        });
      }
      
      // Filter by size (if applicable)
      if (activeFilters.size && Array.isArray(activeFilters.size) && activeFilters.size.length > 0) {
        filtered = filtered.filter(product =>
          product.size && product.size.some(size => (activeFilters.size as string[]).includes(size))
        );
      }
      
      // Filter by gender (if applicable)
      if (activeFilters.gender && Array.isArray(activeFilters.gender) && activeFilters.gender.length > 0) {
        filtered = filtered.filter(product =>
          product.gender && (activeFilters.gender as string[]).includes(product.gender)
        );
      }
      
      // Filter by color (if applicable)
      if (activeFilters.color && Array.isArray(activeFilters.color) && activeFilters.color.length > 0) {
        filtered = filtered.filter(product =>
          product.color && product.color.some(color => (activeFilters.color as string[]).includes(color))
        );
      }
      
      // Filter by material (if applicable)
      if (activeFilters.material && Array.isArray(activeFilters.material) && activeFilters.material.length > 0) {
        filtered = filtered.filter(product =>
          product.material && product.material.some(material => (activeFilters.material as string[]).includes(material))
        );
      }
      
      // Sort products
      if (activeFilters.sort && Array.isArray(activeFilters.sort) && activeFilters.sort.length > 0) {
        const sortOption = (activeFilters.sort as string[])[0];
        
        switch (sortOption) {
          case 'Newest':
            // In a real app, we would sort by date
            // For now, just shuffle the array
            filtered = [...filtered].sort(() => Math.random() - 0.5);
            break;
          case 'Price: Low to High':
            filtered = [...filtered].sort((a, b) => a.price - b.price);
            break;
          case 'Price: High to Low':
            filtered = [...filtered].sort((a, b) => b.price - a.price);
            break;
          case 'Trending':
          case 'Best Selling':
            // In a real app, we would sort by sales or views
            // For now, just shuffle the array
            filtered = [...filtered].sort(() => Math.random() - 0.5);
            break;
        }
      }
    }
    
    setFilteredProducts(filtered);
  }, [category, subcategory, item, anime, activeFilters]);
  
  // Handle filter changes
  const handleFilterChange = (filters: ProductFilters) => {
    setActiveFilters(filters);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex flex-wrap items-center text-sm">
          {getBreadcrumbs().map((crumb, index, array) => (
            <li key={crumb.href} className="flex items-center">
              <Link 
                href={crumb.href}
                className={index === array.length - 1 
                  ? "font-medium text-anime-neonPurple" 
                  : "text-muted-foreground hover:text-anime-neonPurple transition-colors"
                }
              >
                {crumb.label}
              </Link>
              {index < array.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-[280px] shrink-0">
          <FilterSystem 
            category={category || undefined}
            subcategory={subcategory || undefined}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Filter Drawer */}
          <div className="lg:hidden mb-4">
            <MobileFilterDrawer
              category={category || undefined}
              subcategory={subcategory || undefined}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Results Count */}
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  anime={product.anime}
                  category={product.category}
                  isNew={product.isNew}
                  isHot={product.isHot}
                  isLimited={product.isLimited}
                  isSoldOut={product.isSoldOut}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search for something else.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}