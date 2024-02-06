import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./css/dropdown.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/signIn";
import ThankYou from "./pages/thankyou";
import FrontPage from "./pages/frontPage";
import ProductDetails from "./pages/productDetails";
import Home from "./pages/home";
import OrderPage1 from "./order1";
import OrderPage2 from "./pages/order2";
import Navbar from "./components/Navbar";
import About from "./pages/about";
import TermsAndConitions from "./pages/termsAndConitions";
import Privacy from "./pages/privacy";
import NotFound from "./pages/notFound";
import Footer from "./components/footer";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <ProductDetails /> },

  { path: "/home", element: <FrontPage /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/thankyou", element: <ThankYou /> },
  { path: "/order", element: <OrderPage2 /> },
  { path: "/about", element: <About /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/termsAndConitions", element: <TermsAndConitions /> },
  { path: "*", element: <NotFound /> },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Navbar />    
    <RouterProvider router={router}/>
    <Footer/>
  </>
);
