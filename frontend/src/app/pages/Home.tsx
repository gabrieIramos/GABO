import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
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
    <div>
      <HeroSlider />

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tighter">Destaques</h2>
          <Link to="/products" className="text-xs md:text-sm uppercase tracking-wider underline hover:text-gray-600">
            Ver todos
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 py-16">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner Secondary */}
      <section className="bg-black text-white py-12 md:py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter mb-3 md:mb-4">
            Excelência em Cada Fio
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            A mesma tecnologia. O mesmo detalhe. A mesma paixão. Experimente o nível máximo de fidelidade em camisas esportivas importadas.
          </p>
        </div>
      </section>
    </div>
  );
}
