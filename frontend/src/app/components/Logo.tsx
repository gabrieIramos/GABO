import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  // Ajuste de escala baseado no tamanho
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.5 : 1;

  return (
    <Link 
      to="/" 
      className={`flex flex-col justify-center cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'left' }}
    >
      {/* "THE" - Pequeno, espaçado e Neon */}
      <span className="text-[10px] font-bold italic tracking-[0.6em] text-lime-400 uppercase leading-none pl-1">
        The
      </span>
      
      {/* "GABO" - Gigante, Itálico e Branco */}
      <h1 className="text-4xl font-black italic text-white tracking-tighter leading-[0.85]">
        GABO
      </h1>
    </Link>
  );
}