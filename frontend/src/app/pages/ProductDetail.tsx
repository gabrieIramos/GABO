import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, Loader2 } from 'lucide-react';
import { fetchProductById, Product } from '../services/productsApi';
import { useCartStore } from '../store/useCartStore';
import { motion } from 'motion/react';
import { getPromoPricing } from '../utils/priceUtils';
import { useToastStore } from '../store/useToastStore';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        showToast({
          title: 'Produto não encontrado',
          description: 'Tente voltar para a página inicial.',
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lime-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white mb-4">Produto não encontrado</p>
          <Link to="/" className="text-lime-400 hover:text-lime-300 uppercase tracking-wider">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  const { originalPrice, discountPercent } = getPromoPricing(product.id, product.price);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast({ title: 'Selecione um tamanho', description: 'Escolha uma opção antes de adicionar ao carrinho.', variant: 'error' });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      team: product.team,
    });

    showToast({ title: 'Adicionado ao carrinho', description: `${product.name} - Tamanho ${selectedSize}`, variant: 'success' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-lime-400 hover:text-lime-300 uppercase text-xs sm:text-sm tracking-wider font-bold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative aspect-square bg-black overflow-hidden">
            {/* Radial gradient background highlight */}
            <div className="absolute inset-0 bg-radial-gradient from-zinc-800/50 via-transparent to-transparent opacity-40"></div>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="relative z-10 w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-zinc-900 border-2 overflow-hidden transition-all duration-300 ${
                  selectedImage === index ? 'border-lime-400' : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4 sm:space-y-6">
          <div>
            <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-[0.2em] mb-2 font-bold">
              {product.team}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tighter mb-3 sm:mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-lime-400 text-lime-400'
                        : 'fill-zinc-700 text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-zinc-400">
                {product.rating} ({product.reviews?.length || 0} avaliações)
              </span>
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3 text-xl sm:text-2xl">
              <span className="text-zinc-500 line-through text-base sm:text-lg">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="font-black text-lime-400">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs sm:text-sm bg-lime-400 text-black px-2 sm:px-3 py-1 uppercase tracking-wide font-black -skew-x-6">
                -{discountPercent}%
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 font-bold text-zinc-400">
              Selecione o Tamanho
            </label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 sm:py-4 border-2 transition-all duration-300 font-black uppercase -skew-x-6 text-sm sm:text-base ${
                    selectedSize === size
                      ? 'border-lime-400 bg-lime-400 text-black shadow-[0_0_20px_rgba(168,255,0,0.3)]'
                      : 'border-zinc-700 text-white hover:border-lime-400'
                  }`}
                >
                  <span className="skew-x-6 inline-block">{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-lime-400 text-black py-4 sm:py-5 text-sm sm:text-base uppercase tracking-wider font-black hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] transition-all duration-300 hover:scale-[1.02]"
          >
            Adicionar ao Carrinho
          </button>

          {/* Description */}
          <div className="border-t border-zinc-800 pt-4 sm:pt-6">
            <h3 className="uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 font-bold text-zinc-400">Descrição</h3>
            <p className="text-sm sm:text-base text-zinc-300">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12 sm:mt-16 border-t border-zinc-800 pt-12 sm:pt-16">
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tighter mb-6 sm:mb-8">Avaliações</h2>
          <div className="space-y-6 max-w-3xl">
            {product.reviews.map((review: any) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-zinc-800 pb-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-lime-400 text-lime-400' : 'fill-zinc-700 text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white font-bold">{review.author}</span>
                  <span className="text-sm text-zinc-500">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-zinc-300">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
