import MegaMenuShadcn from "./components/custom/MegaMenu/MegaMenuShadcn";
import ProductBar from "./components/custom/ProductBar/ProductBar";
import PromoSlider from "./components/custom/PromoSlider/PromoSlider";
import ProductListing from "./layouts/ProductListing";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  // Layout Component
  const Layout = () => (
    <div>
      <MegaMenuShadcn />
      <PromoSlider />
      <Outlet />
    </div>
  );

  // Page Components
  const Blog = () => <div>Blog Page</div>;
  const About = () => <div>About Page</div>;
  const Contact = () => <div>Contact Page</div>;
  const LoginSignUp = () => <div>Login/Sign Up Page</div>;
  const Cart = () => <div>Cart Page</div>;
  const Wishlist = () => <div>Wishlist Page</div>;
  const Account = () => <div>Account Page</div>;

  // Define Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        // Routes for categories, subcategories, and sub-subcategories without slashes
        { path: ":productString", element: <ProductListing /> },

        // Other pages
        { path: "blog", element: <Blog /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "login", element: <LoginSignUp /> },
        { path: "register", element: <LoginSignUp /> },
        { path: "reset", element: <LoginSignUp /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "account", element: <Account /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
