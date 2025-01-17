import Navbar from "./components/custom/Navbar"
import ProductCard from "./components/ProductCard1"
import ProductListing from "./layouts/ProductListing"

function App() {

  return (
    <>
      <Navbar />
      <section className="">
        <ProductListing />
      </section>
    </>
  )
}

export default App
