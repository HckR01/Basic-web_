import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

// Check if Clerk is available
const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Services", path: "/services" },
    { name: "Reviews", path: "/reviews" },
    { name: "Shop", path: "/shop" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Nail<span>Artistry</span>
        </Link>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {hasClerk ? (
            <>
              <SignedIn>
                <Link
                  to="/book"
                  className="btn btn-primary mobile-only"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="btn btn-outline mobile-only"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <Link
              to="/book"
              className="btn btn-primary mobile-only"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          )}
        </div>

        <div className="nav-actions">
          {hasClerk ? (
            <>
              <SignedIn>
                <Link to="/cart" className="cart-icon">
                  <ShoppingBag size={24} />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn btn-outline">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link to="/book" className="btn btn-primary desktop-only">
                  Book Now
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </>
          ) : (
            <>
              <Link to="/cart" className="cart-icon">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              <Link to="/book" className="btn btn-primary desktop-only">
                Book Now
              </Link>
            </>
          )}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
