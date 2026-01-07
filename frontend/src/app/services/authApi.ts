const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Credenciais inválidas');
  return res.json();
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export async function register(payload: RegisterPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Falha no cadastro' }));
    throw new Error(error.message || 'Falha no cadastro');
  }
  return res.json();
}

export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) throw new Error('Falha no login com Google');
  return res.json();
}
