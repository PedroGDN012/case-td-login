import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const isDemo = !supabase;

const DEMO = { email: "admin@demo.com", password: "123456" };
const DEMO_KEY = "demo-session";

// Retorna null em caso de sucesso, ou a mensagem de erro.
export async function signIn(email, password) {
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? "E-mail ou senha incorretos." : null;
  }
  if (email === DEMO.email && password === DEMO.password) {
    localStorage.setItem(DEMO_KEY, email);
    return null;
  }
  return "E-mail ou senha incorretos.";
}

export async function getUserEmail() {
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    return data.session?.user.email ?? null;
  }
  return localStorage.getItem(DEMO_KEY);
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut();
  else localStorage.removeItem(DEMO_KEY);
}