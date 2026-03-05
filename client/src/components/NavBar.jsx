import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">Marketplace</Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          {user?.role === "vendor" && <Link to="/vendor">Vendor</Link>}
          {user && <Link to="/orders">My Orders</Link>}
          {!user ? <Link to="/auth">Login</Link> : <button onClick={logout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
