import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    api("/products").then(setProducts).catch(() => setProducts([]));
  }, []);

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const checkout = async () => {
    const items = Object.entries(cart).map(([productId, quantity]) => ({ productId, quantity }));
    if (!items.length) return;
    try {
      await api("/orders", { method: "POST", token, body: { items } });
      setCart({});
      setMessage("Order placed successfully");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img className="product" src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <small className="muted">Vendor: {p.vendor?.name || "Unknown"}</small>
            <p>{p.description}</p>
            <strong>${p.price}</strong> · <small>Stock {p.stock}</small>
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={() => add(p._id)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      {user?.role === "customer" && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3>Cart summary</h3>
          <p>{Object.values(cart).reduce((a, b) => a + b, 0)} item(s)</p>
          <button onClick={checkout}>Checkout</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </>
  );
}
