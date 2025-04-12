import React, { useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "@/components/ui/product-card"
import { product } from "@/dummyData/Products"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import FilterSystem from "@/components/custom/FilterSystem/FilterSystem"

// Define the type for active filters
type ActiveFilters = Record<string, string[] | number[]>;

const ProductListing: React.FC = () => {
  const { productString } = useParams<{ productString?: string }>();
  const [category, subcategory, subsubcategory] = productString?.split("-") || [];
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  // Format the breadcrumb items
  const formatBreadcrumb = (text: string | undefined) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Handle filter changes
  const handleFilterChange = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    // In a real application, you would filter products based on these filters
    console.log("Active filters:", filters);
  };

  return (
    <SidebarProvider>
      <FilterSystem onFilterChange={handleFilterChange} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-background px-4 border-b">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{formatBreadcrumb(category)}</BreadcrumbPage>
              </BreadcrumbItem>
              {subcategory && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{formatBreadcrumb(subcategory)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {subsubcategory && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{formatBreadcrumb(subsubcategory)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="product-listing-header">
            <h1 className="text-2xl font-bold">
              {formatBreadcrumb(subsubcategory || subcategory || category)}
            </h1>
            <p className="text-gray-500">
              {Object.keys(activeFilters).length > 0 
                ? `Showing filtered results (${Object.keys(activeFilters).length} filters applied)`
                : "Showing all products"}
            </p>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCard
                name={product.name}
                price={product.price}
                image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1736596237_9421843.jpg?format=webp&w=480&dpr=2.0"
                brand="Souled Store"
                key={i}
                className="bg-white"
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ProductListing