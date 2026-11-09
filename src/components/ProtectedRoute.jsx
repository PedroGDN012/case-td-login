import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserEmail } from "../lib/auth.js";

// Só mostra a rota se houver sessão; caso contrário, volta para o login.
export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // loading | in | out

  useEffect(() => {
    getUserEmail().then((email) => setStatus(email ? "in" : "out"));
  }, []);

  if (status === "loading") return null;
  if (status === "out") return <Navigate to="/login" replace />;
  return children;
}