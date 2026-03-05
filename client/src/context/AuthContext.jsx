import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : { token: null, user: null };
  });

  const login = (payload) => {
    setAuth(payload);
    localStorage.setItem("auth", JSON.stringify(payload));
  };

  const logout = () => {
    const empty = { token: null, user: null };
    setAuth(empty);
    localStorage.removeItem("auth");
  };

  const value = useMemo(() => ({ ...auth, login, logout }), [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
