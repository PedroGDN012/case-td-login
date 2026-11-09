import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, isDemo } from "../lib/auth.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Digite um e-mail válido.");
    if (password.length < 6) return setError("A senha deve ter pelo menos 6 caracteres.");
    setLoading(true);
    const err = await signIn(email.trim(), password);
    setLoading(false);
    if (err) return setError(err);
    navigate("/admin");
  }

  return (
    <main className="page">
      <div className="top-right"><ThemeToggle /></div>
      <section className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <input type="email" aria-label="E-mail" autoComplete="email" placeholder="E-mail"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" aria-label="Senha" autoComplete="current-password" placeholder="Senha"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error" role="alert">{error}</p>}
          <button type="submit" className="primary" disabled={loading}>
            {loading ? "ENTRANDO..." : "LOGIN"}
          </button>
        </form>
        {isDemo && <p className="hint">Modo demo: admin@demo.com / 123456</p>}
      </section>
    </main>
  );
}