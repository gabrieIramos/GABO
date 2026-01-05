import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { featuredProducts } from '../data/products';

export function Home() {
  return (
    <div>
      <HeroSlider />
      
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-3xl md:text-4xl tracking-tighter mb-12">
          Destaques
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner Secondary */}
      <section className="bg-black text-white py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl tracking-tighter mb-4">
            AUTENTICIDADE GARANTIDA
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Todos os nossos produtos são 100% originais e licenciados. Entrega rápida e segura para todo o Brasil.
          </p>
        </div>
      </section>
    </div>
  );
}
