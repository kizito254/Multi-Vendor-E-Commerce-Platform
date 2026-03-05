import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api("/orders/mine", { token }).then(setOrders).catch(() => setOrders([]));
  }, []);

  return (
    <>
      <h2>My Orders</h2>
      <div className="grid">
        {orders.map((o) => (
          <div className="card" key={o._id}>
            <strong>Order #{o._id.slice(-6)}</strong>
            <p>Status: {o.status}</p>
            <p>Total: ${o.total}</p>
            <small>{o.items.length} item(s)</small>
          </div>
        ))}
      </div>
    </>
  );
}
