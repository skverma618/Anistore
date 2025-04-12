import { FC } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  className?: string;
  wishlisted?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  image,
  brand,
  name,
  price,
  originalPrice,
  discount,
  className,
  wishlisted = false,
}) => {
  return (
    <Card className={cn(
      "group relative cursor-pointer overflow-hidden transition-transform hover:-translate-y-1",
      className
    )}>
      {/* Image container */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {discount}% OFF
          </span>
        )}
        {/* Wishlist icon */}
        <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-lg shadow-sm transition-colors hover:bg-white">
          {wishlisted ? 
            <FaHeart className='text-red-600' /> : 
            <FaRegHeart className='text-gray-700' />
          }
        </button>
        {/* Star rating */}
        <div className="absolute left-2 bottom-2 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 text-yellow-500">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="font-medium">4.5</span>
        </div>
      </div>

      {/* Product details */}
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-700">{brand}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{name}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
              <span className="text-sm font-medium text-red-500">
                ({discount}% OFF)
              </span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;