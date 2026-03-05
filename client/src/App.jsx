import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductsPage from "./pages/ProductsPage";
import AuthPage from "./pages/AuthPage";
import VendorPage from "./pages/VendorPage";
import OrdersPage from "./pages/OrdersPage";
import { useAuth } from "./context/AuthContext";

const Protected = ({ allow, children }) => {
  const { user } = useAuth();
  if (!user || (allow && !allow.includes(user.role))) return <Navigate to="/auth" replace />;
  return children;
};

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/vendor" element={<Protected allow={["vendor"]}><VendorPage /></Protected>} />
          <Route path="/orders" element={<Protected><OrdersPage /></Protected>} />
        </Routes>
      </main>
    </>
  );
}
