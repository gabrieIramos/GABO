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
    <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24 flex items-center justify-center px-4">
      <div className="max-w-[500px] w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 space-y-6">
        <div className="flex items-center gap-3">
          {mode === 'login' ? <LogIn className="w-6 h-6 text-lime-400" /> : <UserPlus className="w-6 h-6 text-lime-400" />}
          <div>
            <h1 className="text-2xl font-black uppercase text-white tracking-tighter">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</h1>
            <p className="text-sm text-zinc-400">{mode === 'login' ? 'Acesse sua conta' : 'Crie sua conta para continuar'}</p>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-950/50 border border-red-900 px-4 py-3">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              className="bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 w-full focus:outline-none focus:border-lime-400 transition-colors"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
            />
          )}
          <input
            type="email"
            className="bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 w-full focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 w-full focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 text-black px-4 py-4 font-black uppercase tracking-wider hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="flex items-center gap-2 text-zinc-500">
          <span className="text-xs">ou</span>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs text-lime-400 hover:text-lime-300 uppercase tracking-wider transition-colors"
          >
            {mode === 'login' ? 'Criar uma conta' : 'Já tenho conta'}
          </button>
        </div>

        <div className="space-y-3 border-t border-zinc-800 pt-6">
          <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-wider font-bold">Entrar com Google</p>
          <div ref={googleDivRef} />
        </div>
      </div>
    </div>
  );
}
