import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { login, register, loginWithGoogle } from '../services/authApi';

declare global {
  interface Window {
    google?: any;
  }
}

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const redirect = query.get('redirect') || '/';

  const setSession = useAuthStore((s) => s.setSession);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load Google Identity script
    const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    } else {
      initializeGoogle();
    }

    function initializeGoogle() {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: any) => {
          if (response.credential) {
            try {
              setLoading(true);
              const data = await loginWithGoogle(response.credential);
              setSession(data.access_token, { id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role });
              navigate(redirect);
            } catch (e: any) {
              setError(e?.message || 'Falha no login com Google');
            } finally {
              setLoading(false);
            }
          }
        },
      });
      if (googleDivRef.current) {
        window.google.accounts.id.renderButton(googleDivRef.current, { theme: 'outline', size: 'large' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = mode === 'login' ? await login(email, password) : await register({ name, email, password });
      setSession(resp.access_token, { id: resp.user.id, name: resp.user.name, email: resp.user.email, role: resp.user.role });
      navigate(redirect);
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err?.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[600px] mx-auto px-4 md:px-6 lg:px-12 py-8">
      <div className="border p-6 space-y-6">
        <div className="flex items-center gap-3">
          {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          <div>
            <h1 className="text-xl font-semibold">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</h1>
            <p className="text-sm text-gray-600">{mode === 'login' ? 'Acesse sua conta' : 'Crie sua conta para continuar'}</p>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <input
              type="text"
              className="border px-3 py-2 w-full"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
            />
          )}
          <input
            type="email"
            className="border px-3 py-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border px-3 py-2 w-full"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">ou</span>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs underline"
          >
            {mode === 'login' ? 'Criar uma conta' : 'Já tenho conta'}
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs md:text-sm text-gray-600">Entrar com Google</p>
          <div ref={googleDivRef} />
        </div>
      </div>
    </div>
  );
}
