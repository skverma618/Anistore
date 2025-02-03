import Navbar from "./components/custom/Header/Navbar";
import ProductBar from "./components/custom/ProductBar/ProductBar";
import ProductListing from "./layouts/ProductListing";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  // Layout Component
  const Layout = () => (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );

  // Page Components
  const Blog = () => <div>Blog Page</div>;
  const About = () => <div>About Page</div>;
  const Contact = () => <div>Contact Page</div>;
  const LoginSignUp = () => <div>Login/Sign Up Page</div>;
  const Cart = () => <div>Cart Page</div>;

  // Define Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <ProductBar /> },

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
