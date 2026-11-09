import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail, signOut } from "../lib/auth.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

const USERS = [
  { name: "Ana Souza", role: "Administradora", status: "Ativo" },
  { name: "Bruno Lima", role: "Editor", status: "Ativo" },
  { name: "Carla Mendes", role: "Leitora", status: "Pendente" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserEmail().then((e) => setEmail(e || ""));
  }, []);

  async function handleLogout() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <main className="page admin">
      <header className="admin-head">
        <div>
          <h1>Painel administrativo</h1>
          <div className="bar" />
          <p className="muted">Logado como {email}</p>
        </div>
        <div className="actions">
          <ThemeToggle />
          <button type="button" className="primary small" onClick={handleLogout}>Sair</button>
        </div>
      </header>

      <section className="card wide">
        <h2>Usuários</h2>
        <table>
          <thead><tr><th>Nome</th><th>Função</th><th>Status</th></tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.name}><td>{u.name}</td><td>{u.role}</td><td>{u.status}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}