// Sample product data for the anime store
// This will be replaced with real data from an API in the future

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  anime: string;
  category: string;
  subcategory: string;
  gender?: string;
  size?: string[];
  color?: string[];
  material?: string[];
  isNew?: boolean;
  isHot?: boolean;
  isLimited?: boolean;
  isSoldOut?: boolean;
  rating?: number;
  reviewCount?: number;
}

// Sample images (in a real app, these would be actual image paths)
const sampleImages = [
  '/images/products/tshirt-naruto.jpg',
  '/images/products/hoodie-demonslayer.jpg',
  '/images/products/figure-onepiece.jpg',
  '/images/products/poster-attackontitan.jpg',
  '/images/products/sticker-myheroacademia.jpg',
  '/images/products/costume-demonslayer.jpg',
  '/images/products/backpack-naruto.jpg',
  '/images/products/plushie-dragonball.jpg',
  '/images/products/pillow-jujutsukaisen.jpg',
  '/images/products/keychain-tokyorevengers.jpg',
  '/images/products/mug-onepunchman.jpg',
  '/images/products/hat-blackclover.jpg',
];

// For demo purposes, we'll use placeholder images
const getPlaceholderImage = (index: number) => {
  return `https://placehold.co/600x600/252525/FFFFFF/png?text=Anime+Product+${index + 1}`;
};

// Generate sample products
export const products: Product[] = Array.from({ length: 48 }, (_, i) => {
  // Determine category and subcategory
  const categories = ['clothing', 'accessories', 'costumes', 'collectibles-decor'];
  const categoryIndex = i % categories.length;
  const category = categories[categoryIndex];
  
  let subcategory = '';
  let name = '';
  
  switch (category) {
    case 'clothing':
      const clothingTypes = ['T-Shirts', 'Hoodies', 'Pants', 'Shorts', 'Innerwear'];
      subcategory = clothingTypes[i % clothingTypes.length];
      name = `${subcategory} - Anime Design ${i + 1}`;
      break;
    case 'accessories':
      const accessoryTypes = ['Jewelry', 'Props', 'Bags', 'Tech Accessories'];
      subcategory = accessoryTypes[i % accessoryTypes.length];
      name = `${subcategory} - Anime Style ${i + 1}`;
      break;
    case 'costumes':
      const costumeTypes = ['Full Sets', 'Partial Sets', 'Cloaks', 'Robes', 'Shoes'];
      subcategory = costumeTypes[i % costumeTypes.length];
      name = `${subcategory} - Character Costume ${i + 1}`;
      break;
    case 'collectibles-decor':
      const collectibleTypes = ['Stickers', 'Toys & Figures', 'Home & Decor', 'Posters & Art'];
      subcategory = collectibleTypes[i % collectibleTypes.length];
      name = `${subcategory} - Collector's Item ${i + 1}`;
      break;
  }
  
  // Determine anime
  const animes = ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball'];
  const anime = animes[i % animes.length];
  
  // Generate price and potential discount
  const basePrice = 20 + (i % 10) * 5;
  const hasDiscount = i % 3 === 0;
  const originalPrice = hasDiscount ? basePrice + 10 + (i % 5) * 5 : undefined;
  
  // Special flags
  const isNew = i % 8 === 0;
  const isHot = i % 7 === 0;
  const isLimited = i % 11 === 0;
  const isSoldOut = i % 13 === 0;
  
  // Additional properties based on category
  let additionalProps: Partial<Product> = {};
  
  if (category === 'clothing' || category === 'costumes') {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Purple'];
    const materials = ['Cotton', 'Polyester', 'Blend', 'Fleece'];
    const genders = ['Men', 'Women', 'Unisex', 'Kids'];
    
    additionalProps = {
      size: [sizes[i % sizes.length], sizes[(i + 1) % sizes.length]],
      color: [colors[i % colors.length], colors[(i + 2) % colors.length]],
      material: [materials[i % materials.length]],
      gender: genders[i % genders.length],
    };
  }
  
  // Rating and reviews
  const rating = 3.5 + (i % 3) * 0.5;
  const reviewCount = 10 + (i % 20) * 5;
  
  return {
    id: `product-${i + 1}`,
    name,
    price: basePrice,
    originalPrice,
    image: getPlaceholderImage(i),
    anime,
    category,
    subcategory,
    isNew,
    isHot,
    isLimited,
    isSoldOut,
    rating,
    reviewCount,
    ...additionalProps
  };
});

// Function to filter products by category and subcategory
export const getProductsByCategory = (category: string, subcategory?: string, item?: string) => {
  let filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  if (subcategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.subcategory.toLowerCase().includes(subcategory.toLowerCase())
    );
  }
  
  // Further filter by specific item if provided
  if (item) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(item.toLowerCase())
    );
  }
  
  return filteredProducts;
};

// Function to filter products by anime
export const getProductsByAnime = (anime: string) => {
  return products.filter(product => 
    product.anime.toLowerCase() === anime.toLowerCase()
  );
};

// Function to get a product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export default products;