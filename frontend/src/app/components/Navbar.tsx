import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Lançamentos', path: '/' },
    { name: 'Seleções', path: '/category/selecoes' },
    { name: 'Clubes', path: '/category/clubes' },
    { name: 'Champions League', path: '/category/champions' },
    { name: 'Retrô', path: '/category/retro' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#F5F5F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl tracking-tight">
            HUBRA
          </Link>

          {/* Search, User, Cart */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:opacity-60 transition-opacity"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/profile"
              className="hover:opacity-60 transition-opacity"
              aria-label="Perfil"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-none outline-none"
              autoFocus
            />
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-8 h-12 items-center overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`whitespace-nowrap uppercase tracking-wider text-sm ${
                location.pathname === category.path
                  ? 'border-b-2 border-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
