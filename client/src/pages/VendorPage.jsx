import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function VendorPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: 0, stock: 0, category: "", imageUrl: "" });
  const [message, setMessage] = useState("");

  const load = () => api("/products/mine", { token }).then(setProducts).catch(() => setProducts([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api("/products", { method: "POST", token, body: { ...form, price: Number(form.price), stock: Number(form.stock) } });
      setForm({ name: "", description: "", price: 0, stock: 0, category: "", imageUrl: "" });
      setMessage("Product created");
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <div className="card">
        <h2>Add product</h2>
        <form onSubmit={submit}>
          <label>Name</label><input value={form.name} required onChange={(e)=>setForm({...form,name:e.target.value})} />
          <label>Description</label><textarea value={form.description} required onChange={(e)=>setForm({...form,description:e.target.value})} />
          <div className="row">
            <div><label>Price</label><input type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} /></div>
            <div><label>Stock</label><input type="number" value={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})} /></div>
          </div>
          <label>Category</label><input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} />
          <label>Image URL</label><input value={form.imageUrl} onChange={(e)=>setForm({...form,imageUrl:e.target.value})} />
          <button type="submit">Create</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <h3>Your products</h3>
      <div className="grid">
        {products.map((p) => <div className="card" key={p._id}><strong>{p.name}</strong><p>${p.price}</p><small>Stock: {p.stock}</small></div>)}
      </div>
    </>
  );
}
