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

// Real product images from the assets directory
const productImages = [
  '/assets/Products/product_1.jpg',
  '/assets/Products/product_2.jpg',
  '/assets/Products/product_3.jpg',
  '/assets/Products/product_4.jpg',
  '/assets/Products/product_5.jpg',
  '/assets/Products/product_6.jpg',
  '/assets/Products/product_7.jpg',
  '/assets/Products/product_8.jpg',
];

// Limited edition product images
const limitedEditionImages = [
  '/assets/LimitedEdition/limited-1.jpg',
  '/assets/LimitedEdition/limited-2.jpg',
  '/assets/LimitedEdition/limited-3.jpg',
  '/assets/LimitedEdition/limited-4.jpg',
  '/assets/LimitedEdition/limited-5.jpg',
];

// Get a product image based on index and whether it's a limited edition
const getProductImage = (index: number, isLimited: boolean = false) => {
  if (isLimited) {
    return limitedEditionImages[index % limitedEditionImages.length];
  }
  return productImages[index % productImages.length];
};

// Anime-specific product names
const animeProductNames: Record<string, string[]> = {
  'Naruto': [
    'Naruto Uzumaki Sage Mode Figure',
    'Akatsuki Cloud Print Hoodie',
    'Hidden Leaf Village Headband',
    'Sasuke Uchiha Sharingan T-Shirt',
    'Kakashi Hatake Mask',
    'Nine-Tails Fox Plushie',
    'Naruto Shippuden Poster Set'
  ],
  'One Piece': [
    'Straw Hat Crew Figurine Collection',
    'Luffy\'s Straw Hat Replica',
    'Going Merry Ship Model',
    'Zoro Three Sword Style T-Shirt',
    'Devil Fruit Replica Set',
    'Chopper Plush Backpack',
    'Wanted Poster Collection'
  ],
  'Demon Slayer': [
    'Tanjiro Kamado Nichirin Sword Replica',
    'Nezuko Bamboo Muzzle Cosplay Prop',
    'Water Breathing Technique T-Shirt',
    'Demon Slayer Corps Uniform',
    'Zenitsu Lightning Pattern Hoodie',
    'Inosuke Boar Mask Replica',
    'Hashira Collection Figure Set'
  ],
  'Attack on Titan': [
    'Survey Corps Jacket',
    'ODM Gear Replica',
    'Colossal Titan Figure',
    'Levi Ackerman Cleaning Set',
    'Wall Maria Breach Poster',
    'Eren Titan Form Statue',
    'Scout Regiment Emblem Patch'
  ],
  'My Hero Academia': [
    'All Might Action Figure',
    'Deku Full Cowling Hoodie',
    'U.A. High School Uniform',
    'Hero License Replica',
    'Bakugo Explosion Gloves',
    'Class 1-A Group Poster',
    'Todoroki Half-Cold Half-Hot T-Shirt'
  ],
  'Dragon Ball': [
    'Super Saiyan Goku Figure',
    'Dragon Balls Set (7 Pieces)',
    'Capsule Corp Logo T-Shirt',
    'Vegeta Saiyan Armor Costume',
    'Shenron Dragon Statue',
    'Master Roshi Sunglasses',
    'Hyperbolic Time Chamber Diorama'
  ]
};

// Generate detailed products
export const products: Product[] = Array.from({ length: 48 }, (_, i) => {
  // Determine category and subcategory
  const categories = ['clothing', 'accessories', 'costumes', 'collectibles-decor'];
  const categoryIndex = i % categories.length;
  const category = categories[categoryIndex];
  
  let subcategory = '';
  let name = '';
  
  // Determine anime
  const animes = ['Naruto', 'One Piece', 'Demon Slayer', 'Attack on Titan', 'My Hero Academia', 'Dragon Ball'];
  const anime = animes[i % animes.length];
  
  switch (category) {
    case 'clothing':
      const clothingTypes = ['T-Shirts', 'Hoodies', 'Pants', 'Shorts', 'Innerwear'];
      subcategory = clothingTypes[i % clothingTypes.length];
      // Get anime-specific product name
      const clothingIndex = i % animeProductNames[anime].length;
      name = `${anime} ${subcategory} - ${animeProductNames[anime][clothingIndex]}`;
      break;
    case 'accessories':
      const accessoryTypes = ['Jewelry', 'Props', 'Bags', 'Tech Accessories'];
      subcategory = accessoryTypes[i % accessoryTypes.length];
      const accessoryIndex = (i + 1) % animeProductNames[anime].length;
      name = `${anime} ${subcategory} - ${animeProductNames[anime][accessoryIndex]}`;
      break;
    case 'costumes':
      const costumeTypes = ['Full Sets', 'Partial Sets', 'Cloaks', 'Robes', 'Shoes'];
      subcategory = costumeTypes[i % costumeTypes.length];
      const costumeIndex = (i + 2) % animeProductNames[anime].length;
      name = `${anime} ${subcategory} - ${animeProductNames[anime][costumeIndex]}`;
      break;
    case 'collectibles-decor':
      const collectibleTypes = ['Stickers', 'Toys & Figures', 'Home & Decor', 'Posters & Art'];
      subcategory = collectibleTypes[i % collectibleTypes.length];
      const collectibleIndex = (i + 3) % animeProductNames[anime].length;
      name = `${anime} ${subcategory} - ${animeProductNames[anime][collectibleIndex]}`;
      break;
  }
  
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
    image: getProductImage(i, isLimited),
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