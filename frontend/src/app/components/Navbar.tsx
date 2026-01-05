import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'Lançamentos', path: '/products?isNew=true' },
    { name: 'Seleções', path: '/products?category=Seleções' },
    { name: 'Clubes', path: '/products?category=Clubes' },
    { name: 'Brasileirao', path: '/products?category=Brasileirão' },    
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#F5F5F5]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Ir para a página inicial">
            <img
              src={"/the-gabo-logo.png"}
              alt="The Gabo"
              className="h-12 md:h-16 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Categories - Desktop */}
          <div className="hidden md:flex gap-4 lg:gap-6 items-center text-xs lg:text-sm uppercase tracking-wider flex-1">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`whitespace-nowrap transition-colors ${
                  location.pathname === category.path
                    ? 'border-b-2 border-black pb-1'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search, User, Cart - Desktop & Mobile */}
          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:opacity-60 transition-opacity"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/profile"
              className="hidden sm:block hover:opacity-60 transition-opacity"
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover:opacity-60 transition-opacity"
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
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-none outline-none text-sm"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#F5F5F5] py-4 space-y-3">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-black hover:bg-[#F5F5F5] rounded transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-black hover:bg-[#F5F5F5] rounded transition-colors sm:hidden"
            >
              Perfil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
