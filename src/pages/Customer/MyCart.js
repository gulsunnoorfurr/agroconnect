import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const MyCart = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const handleCheckout = () => {
    if (!user || cart.length === 0) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const newOrder = {
      orderId: uuidv4(),
      customerName: user.username,
      status: "Order Received",
      products: cart.map((item) => ({
        productId: item.id,
        productName: item.productName,
        productImage: item.image,
        quantity: item.quantity,
        unit: item.unit || "kg",
        totalPrice: item.quantity * item.price,
      })),
    };

    // Update stock in products
    cart.forEach((item) => {
      const index = allProducts.findIndex((p) => p.id === item.id);
      if (index !== -1) {
        allProducts[index].quantity = Math.max(
          0,
          allProducts[index].quantity - item.quantity
        );
      }
    });

    localStorage.setItem("products", JSON.stringify(allProducts));
    localStorage.setItem("orders", JSON.stringify([...allOrders, newOrder]));

    clearCart();
    alert("Order placed successfully!");
    navigate("/order-status");
  };

  return (
    <div className="container mt-4">
      <h3>My Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li className="list-group-item" key={item.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={item.image}
                      alt={item.productName}
                      width={60}
                      height={60}
                      className="me-3"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                    <strong>{item.productName}</strong> — {item.quantity}{" "}
                    {item.unit || "kg"} × ₹{item.price}
                  </div>
                  <div>
                    <strong>₹{item.quantity * item.price}</strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h5>Total: ₹{total}</h5>
          <button className="btn btn-success" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default MyCart;
