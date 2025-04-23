import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchOrders = () => {
    const all = JSON.parse(localStorage.getItem("orders")) || [];
    const myOrders = all
      .filter((o) => o.customerName === user.username)
      .map((o) => ({
        ...o,
        products: Array.isArray(o.products) ? o.products : [],
      }));
    setOrders(myOrders);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders placed.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products.map((product, index) => (
                  <tr key={`${order.orderId}-${index}`}>
                    {index === 0 && (
                      <td rowSpan={order.products.length}>{order.orderId}</td>
                    )}
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          width={50}
                          height={50}
                          className="me-2"
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                        {product.productName}
                      </div>
                    </td>
                    <td>
                      {product.quantity} {product.unit || "kg"}
                    </td>
                    <td>₹{product.totalPrice}</td>
                    {index === 0 && (
                      <td rowSpan={order.products.length}>{order.status}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
