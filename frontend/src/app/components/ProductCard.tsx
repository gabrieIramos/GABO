import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative aspect-square bg-[#F5F5F5] overflow-hidden mb-4">
          <motion.img
            key={`product-img-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            src={product.images[currentIndex] ?? product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs uppercase tracking-wider">
              Lançamento
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-600 uppercase tracking-wider">
            {product.team}
          </p>
          <h3 className="text-sm group-hover:underline">{product.name}</h3>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-400 line-through">
              R$ {originalPrice.toFixed(2).replace('.', ',')}
            </span>
            <span className="font-medium">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-xs bg-black text-white px-2 py-0.5 uppercase tracking-wide">
              -{discountPercent}%
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
