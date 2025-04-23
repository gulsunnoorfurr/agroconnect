import React, { useEffect, useState } from "react";

const STATUS_FLOW = [
  "Order Received",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  const handleTempStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId ? { ...o, tempStatus: newStatus } : o
      )
    );
  };

  const applyStatusUpdate = (orderId) => {
    const updated = orders.map((o) => {
      if (o.orderId !== orderId) return o;
      const chosen = o.tempStatus || o.status;
      const finalStatus = chosen === "Delivered" ? "Completed" : chosen;
      const history = o.statusHistory ? [...o.statusHistory] : [];
      if (!history.includes(finalStatus)) history.push(finalStatus);
      return {
        ...o,
        status: finalStatus,
        statusHistory: history,
        tempStatus: undefined,
      };
    });
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const getItems = (order) =>
    Array.isArray(order.items)
      ? order.items
      : order.products || [
          {
            productId: order.productId,
            productName: order.productName,
            productImage: order.productImage,
            quantity: order.quantity,
            unit: order.unit,
            price: order.price,
            totalPrice: order.totalPrice,
          },
        ];

  const orderTotal = (order) =>
    getItems(order).reduce(
      (sum, i) => sum + (i.totalPrice ?? i.price * i.quantity),
      0
    );

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Images</th>
              <th>Items</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
              <th>Updated Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const items = getItems(order);
              const current = order.tempStatus || order.status;
              const completed = order.status === "Completed";

              return (
                <tr key={order.orderId}>
                  {/* Show all images */}
                  <td>
                    {items.map((item, idx) =>
                      item.productImage ? (
                        <img
                          key={idx}
                          src={item.productImage}
                          alt={item.productName}
                          width="50"
                          height="50"
                          className="me-2 mb-1"
                          style={{ objectFit: "cover", borderRadius: "6px" }}
                        />
                      ) : (
                        <div key={idx}>No image</div>
                      )
                    )}
                  </td>

                  {/* Show all product info */}
                  <td>
                    {items.map((item, idx) => (
                      <div key={idx} className="mb-1">
                        <strong>{item.productName}</strong> — {item.quantity}{" "}
                        {item.unit || "kg"}
                      </div>
                    ))}
                  </td>

                  <td>{order.customerName}</td>
                  <td>₹{orderTotal(order)}</td>

                  <td>
                    {completed ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <select
                        className="form-select form-select-sm"
                        value={current}
                        onChange={(e) =>
                          handleTempStatusChange(order.orderId, e.target.value)
                        }>
                        {STATUS_FLOW.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            disabled={order.statusHistory?.includes(opt)}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => applyStatusUpdate(order.orderId)}
                      disabled={completed}>
                      {completed ? "Done" : "Update"}
                    </button>
                  </td>

                  <td>
                    <strong>{order.status}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
