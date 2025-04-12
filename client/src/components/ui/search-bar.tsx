import * as React from "react"
import { FiSearch } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, containerClassName, placeholder = "Search for products, brands and more", ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "flex items-center gap-2 w-full rounded-md bg-gray-100 px-3 py-2",
          containerClassName
        )}
      >
        <FiSearch className="text-gray-500" size={18} />
        <Input
          className={cn(
            "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 placeholder:text-gray-500",
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }