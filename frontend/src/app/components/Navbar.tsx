import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Logo } from '../components/Logo';

export function Navbar() {
  const location = useLocation();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const categories = [
    { name: 'Lançamentos', path: '/products?isNew=true' },
    { name: 'Seleções', path: '/products?category=Seleções' },
    { name: 'Clubes', path: '/products?category=Clubes' },
    { name: 'Brasileirao', path: '/products?category=Brasileirão' },    
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Categories - Desktop */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center text-xs uppercase tracking-[0.2em] font-bold flex-1 justify-center">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`whitespace-nowrap transition-all duration-300 pb-1 ${
                  location.pathname === category.path
                    ? 'text-lime-400 border-b-2 border-lime-400'
                    : 'text-white hover:text-lime-400 hover:border-b-2 hover:border-lime-400'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search, User, Cart - Desktop & Mobile */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-lime-400 transition-colors duration-300"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={isAuthenticated ? "/profile" : "/auth"}
              className="hidden sm:block text-white hover:text-lime-400 transition-colors duration-300"
              aria-label="Perfil"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="relative text-white hover:text-lime-400 transition-colors duration-300"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-lime-400 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-lime-400 transition-colors duration-300"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 rounded-none outline-none focus:border-lime-400 transition-colors text-sm"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-3">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm uppercase tracking-[0.2em] font-bold text-white hover:text-lime-400 hover:bg-zinc-900/50 rounded transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? "/profile" : "/auth"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm uppercase tracking-[0.2em] font-bold text-white hover:text-lime-400 hover:bg-zinc-900/50 rounded transition-colors sm:hidden"
            >
              Perfil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
