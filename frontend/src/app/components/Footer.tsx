import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    company: [
      { name: 'Sobre Nós', path: '/about' },      
    ],
    help: [
      { name: 'Política de Privacidade', path: '/privacy' },
      { name: 'Termos de Uso', path: '/terms' },
      { name: 'Trocas e Devoluções', path: '/returns' },
      { name: 'Frete e Entrega', path: '/shipping' },
    ],
  };

  return (
    <footer className="bg-black text-white mt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl tracking-tight mb-4">Hubra</h3>
            <p className="text-gray-400 text-sm">
              A melhor loja de camisas de futebol do Brasil. Produtos oficiais e entrega rápida.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="uppercase tracking-wider text-sm mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="uppercase tracking-wider text-sm mb-4">Ajuda</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="uppercase tracking-wider text-sm mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Hubra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
