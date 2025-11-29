import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import "./Orders.css";

// Check if Clerk is available
const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Orders = () => {
  // Get user ID (fallback to 'guest' if Clerk not available)
  const [userId, setUserId] = useState("guest");

  useEffect(() => {
    if (hasClerk) {
      const getUserId = async () => {
        try {
          const clerkReact = await import("@clerk/clerk-react");
          const userHook = clerkReact.useUser();
          setUserId(userHook.user?.id || "guest");
        } catch {
          // Clerk not available, keep as guest
          setUserId("guest");
        }
      };
      getUserId();
    }
  }, []);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem("nailart_orders");
    const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
    setOrders(allOrders.filter((order) => order.userId === userId));
  }, [userId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={20} color="#28a745" />;
      case "shipped":
        return <Truck size={20} color="#007bff" />;
      case "delivered":
        return <Package size={20} color="#28a745" />;
      default:
        return <Clock size={20} color="#ffc107" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Order Confirmed";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return "Processing";
    }
  };

  const handleTrackOrder = (order) => {
    const message = `Hi! I'd like to track my order.\n\nOrder ID: ${
      order.id
    }\n\nCurrent Status: ${getStatusText(order.status)}\n\nAddress: ${
      order.address.name
    }\n${order.address.street}, ${order.address.city}, ${
      order.address.state
    }, ${order.address.zip}\n\nItems:\n${order.items
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`
      )
      .join("\n")}\n\nTotal: ₹${order.total}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918850614922?text=${encodedMessage}`, "_blank");
  };

  const clearAllOrders = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all your orders? This action cannot be undone."
      )
    ) {
      const allOrders = JSON.parse(
        localStorage.getItem("nailart_orders") || "[]"
      );
      const filteredOrders = allOrders.filter(
        (order) => order.userId !== userId
      );
      localStorage.setItem("nailart_orders", JSON.stringify(filteredOrders));
      setOrders([]);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders-page page-content">
        <div className="container text-center empty-orders">
          <Package size={64} color="#ccc" />
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet.</p>
          <a href="/shop" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page page-content">
      <div className="container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <button className="btn btn-outline-danger" onClick={clearAllOrders}>
            Clear All Orders
          </button>
        </div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: ₹{order.total}</strong>
                </div>
                <div className="order-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleTrackOrder(order)}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div
              className="modal-content order-details-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Order Details #{selectedOrder.id}</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </button>
              </div>

              <div className="order-details">
                <div className="detail-section">
                  <h4>Order Status</h4>
                  <div className="status-display">
                    {getStatusIcon(selectedOrder.status)}
                    <span>{getStatusText(selectedOrder.status)}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Shipping Address</h4>
                  <div className="address-display">
                    <MapPin size={16} />
                    <div>
                      <p>
                        <strong>{selectedOrder.address.name}</strong>
                      </p>
                      <p>{selectedOrder.address.street}</p>
                      <p>
                        {selectedOrder.address.city},{" "}
                        {selectedOrder.address.state}{" "}
                        {selectedOrder.address.zip}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Order Items</h4>
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="detail-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h5>{item.name}</h5>
                          <p>Quantity: {item.quantity}</p>
                          <p>
                            Price: ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Order Summary</h4>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>₹{selectedOrder.total}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>₹{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleTrackOrder(selectedOrder)}
                  >
                    Confirm here via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
