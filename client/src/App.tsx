import ProductCard from "./components/ProductCard1"
import ProductListing from "./layouts/ProductListing"

function App() {
  const product = {
    name: "Sample Product",
    price: 29.99,
    description: "This is a sample product description."
  };

  return (
    <>
      <ProductCard 
        name={product.name} 
        price={product.price} 
        image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1736596237_9421843.jpg?format=webp&w=480&dpr=2.0"
        brand="Souled Store"
      />
      <ProductListing />
    </>
  )
}

export default App
