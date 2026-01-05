import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square bg-[#F5F5F5] overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <p className="text-sm">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
