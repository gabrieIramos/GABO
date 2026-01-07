import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroMatchDay } from '../components/HeroMatchDay';
import { Ticker } from '../components/Ticker';
import { Reveal } from '../components/Reveal';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts, Product } from '../services/productsApi';
import { useToastStore } from '../store/useToastStore';
import { Loader2 } from 'lucide-react';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 4)); // Mostrar apenas 4 produtos
      } catch (err) {
        console.error(err);
        showToast({
          title: 'Erro ao carregar produtos',
          description: 'Tente novamente mais tarde.',
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [showToast]);

  return (
    <div className="bg-black min-h-screen pt-16 md:pt-20">
      <HeroMatchDay />
      <Ticker />

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-12 md:py-20 lg:py-24 bg-black">
        <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white tracking-tighter">
              Destaques do <span className="text-lime-400">Dia</span>
            </h2>
          </Reveal>
          <Reveal delay={100} direction="right">
            <Link to="/products" className="border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black px-3 sm:px-4 md:px-6 py-2 md:py-3 uppercase text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest transition-all duration-300">
              Ver Todos
            </Link>
          </Reveal>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-lime-400" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-zinc-400 py-16 text-lg">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner Secondary */}
      <section className="bg-gradient-to-r from-black via-zinc-900 to-black border-y border-zinc-800 py-16 md:py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-white tracking-tighter mb-4 sm:mb-6 leading-none">
                Excelência em
                <br />
                <span className="text-lime-400 drop-shadow-[0_0_30px_rgba(168,255,0,0.5)]">
                  Cada Fio
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                A mesma tecnologia. O mesmo detalhe. A mesma paixão. Experimente o nível máximo de fidelidade em camisas esportivas importadas.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <Link to="/products" className="inline-block bg-lime-400 text-black font-black uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] transition-all duration-300 hover:scale-105">
                Descubra Mais
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
