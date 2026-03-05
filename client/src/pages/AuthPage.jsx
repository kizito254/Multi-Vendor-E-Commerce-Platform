import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api(`/auth/${isRegister ? "register" : "login"}`, { method: "POST", body: form });
      login(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>{isRegister ? "Create account" : "Sign in"}</h2>
      <form onSubmit={submit}>
        {isRegister && (<><label>Name</label><input required onChange={(e)=>setForm({...form,name:e.target.value})} /></>)}
        <label>Email</label><input type="email" required onChange={(e)=>setForm({...form,email:e.target.value})} />
        <label>Password</label><input type="password" required onChange={(e)=>setForm({...form,password:e.target.value})} />
        {isRegister && (
          <>
            <label>Role</label>
            <select onChange={(e)=>setForm({...form,role:e.target.value})}>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </>
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      {error && <p>{error}</p>}
      <small className="muted" onClick={()=>setIsRegister((v)=>!v)} style={{cursor:"pointer"}}>
        {isRegister ? "Have an account? Sign in" : "Need an account? Register"}
      </small>
    </div>
  );
}
