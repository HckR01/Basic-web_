import React, { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import "./Cart.css";

// Check if Clerk is available
const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const CartContent = ({ userId }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderCompleteModal, setShowOrderCompleteModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckout = () => {
    if (
      !address.name ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip
    ) {
      setShowAddressModal(true);
      return;
    }

    // Generate order ID
    const newOrderId = `NA${Date.now()}`;
    setOrderId(newOrderId);
    setShowOrderCompleteModal(true);
  };

  const handleTrackOrder = () => {
    // Save order to localStorage with user ID
    const orderData = {
      id: orderId,
      userId: userId,
      date: new Date().toISOString(),
      items: cart,
      total: cartTotal.toFixed(2),
      address: address,
      status: "confirmed", // Initial status
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("nailart_orders") || "[]"
    );
    existingOrders.unshift(orderData); // Add to beginning
    localStorage.setItem("nailart_orders", JSON.stringify(existingOrders));

    const message = `Hi! I'd like to track my order.\n\nOrder ID: ${orderId}\n\nAddress: ${address.name
      }\n${address.street}, ${address.city}, ${address.state}, ${address.zip
      }\n\nItems:\n${cart
        .map(
          (item) =>
            `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`
        )
        .join("\n")}\n\nTotal: ₹${cartTotal.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918850614922?text=${encodedMessage}`, "_blank");
    clearCart();
    setShowOrderCompleteModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page page-content">
        <div className="container text-center empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet.</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-content">
      <div className="container">
        <h1 className="mb-4">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary btn-block checkout-btn"
              onClick={handleCheckout}
            >
              Checkout via WhatsApp <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {showAddressModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowAddressModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Enter Your Shipping Address</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowAddressModal(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Save Address
                </button>
              </form>
            </div>
          </div>
        )}

        {showOrderCompleteModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowOrderCompleteModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Order Complete! 🎉</h3>
              <p>Your order has been placed successfully.</p>
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>You will receive a confirmation message on WhatsApp.</p>
              <button onClick={handleTrackOrder} className="btn btn-primary">
                Track Order via WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartWithAuth = () => {
  const { user, isSignedIn } = useUser();
  const userId = isSignedIn ? user.id : "guest";
  return <CartContent userId={userId} />;
};

const Cart = () => {
  if (hasClerk) {
    return <CartWithAuth />;
  }
  return <CartContent userId="guest" />;
};

export default Cart;
