import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import "./App.css";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn(
    "Clerk publishable key not found. Authentication features will be disabled."
  );
}

function App() {
  const [clerkLoaded, setClerkLoaded] = useState(false);
  const [ClerkProvider, setClerkProvider] = useState(
    () =>
      ({ children }) =>
        children
  );
  const [ClerkSignedIn, setClerkSignedIn] = useState(
    () =>
      ({ children }) =>
        children
  );
  const [ClerkSignIn, setClerkSignIn] = useState(() => () => (
    <div>Please configure Clerk to access sign-in functionality.</div>
  ));
  const [ClerkSignUp, setClerkSignUp] = useState(() => () => (
    <div>Please configure Clerk to access sign-up functionality.</div>
  ));

  useEffect(() => {
    if (PUBLISHABLE_KEY) {
      import("@clerk/clerk-react")
        .then((module) => {
          setClerkProvider(() => module.ClerkProvider);
          setClerkSignedIn(() => module.SignedIn);
          setClerkSignIn(() => module.SignIn);
          setClerkSignUp(() => module.SignUp);
          setClerkLoaded(true);
        })
        .catch((error) => {
          console.warn("Failed to load Clerk components:", error);
          setClerkLoaded(true);
        });
    } else {
      setClerkLoaded(true);
    }
  }, []);

  if (!clerkLoaded) {
    return <div>Loading...</div>;
  }

  const appContent = (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/shop" element={<Shop />} />
              {PUBLISHABLE_KEY ? (
                <>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/book" element={<Booking />} />
                  <Route path="/sign-in" element={<ClerkSignIn />} />
                  <Route path="/sign-up" element={<ClerkSignUp />} />
                </>
              ) : (
                <>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/book" element={<Booking />} />
                </>
              )}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );

  if (PUBLISHABLE_KEY) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {appContent}
      </ClerkProvider>
    );
  }

  return appContent;
}

export default App;

//done
