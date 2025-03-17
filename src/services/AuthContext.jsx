import { createContext, useContext, useState, useEffect } from "react";
import useStore from "../store/userStore";
import { api } from "../assets/variables";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return logout();

    try {
      const response = await fetch(`${api}api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshAccessToken, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);