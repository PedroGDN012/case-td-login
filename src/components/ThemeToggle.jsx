import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "dark");

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    setTheme(next);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Alternar entre modo claro e escuro">
      {theme === "dark" ? "☀ Modo claro" : "☾ Modo escuro"}
    </button>
  );
}