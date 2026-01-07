import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { getPromoPricing } from '../utils/priceUtils';
import { Product } from '../services/productsApi';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const price = Number(product.price) || 0;
  const { originalPrice, discountPercent } = getPromoPricing(product.id, price);

  const hasMultipleImages = Array.isArray(product.images) && product.images.length > 1;

  const handleMouseEnter = () => {
    if (!hasMultipleImages) return;
    
    // Start cycling through all images
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % product.images.length);
    }, 1200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentIndex(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Card Container */}
        <div className="h-full bg-zinc-900 border border-zinc-800 hover:border-lime-400 transition-all duration-300 overflow-hidden relative flex flex-col">
          
          {/* Image Container */}
          <div
            className="relative aspect-square bg-zinc-950 overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,255,0,0.2)] transition-all duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              key={`product-img-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              src={product.images[currentIndex] ?? product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300" />

            {/* Discount Badge - Inclinado */}
            {discountPercent > 0 && (
              <div className="absolute top-3 right-3 -skew-x-12 origin-top-right">
                <div className="bg-lime-400 text-black font-black px-4 py-2 uppercase text-xs tracking-widest">
                  -{discountPercent}%
                </div>
              </div>
            )}

            {/* New Badge */}
            {product.isNew && (
              <div className="absolute top-3 left-3 border border-lime-400 bg-lime-400/10 text-lime-400 px-3 py-1 text-xs uppercase tracking-widest font-bold">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  NOVO
                </div>
              </div>
            )}

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-3 bg-black/70 border border-zinc-700 text-zinc-300 px-2 py-1 text-xs uppercase tracking-widest">
                {currentIndex + 1}/{product.images.length}
              </div>
            )}

            {/* Corner Decorative Lines */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-lime-400/20 group-hover:border-lime-400 transition-colors duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-lime-400/20 group-hover:border-lime-400 transition-colors duration-300" />
          </div>

          {/* Info Container */}
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
            {/* Team/Category */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                {product.team}
              </p>
              <h3 className="text-sm md:text-base font-black uppercase text-white group-hover:text-lime-400 transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
            </div>

            {/* Price Section */}
            <div className="space-y-3 border-t border-zinc-800 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-zinc-500 line-through">
                  R$ {originalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-black text-lime-400">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* CTA Button */}
              <button
                className="w-full border-2 border-lime-400 bg-transparent text-lime-400 group-hover:bg-lime-400 group-hover:text-black font-black uppercase tracking-wider py-3 px-4 mt-3 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
