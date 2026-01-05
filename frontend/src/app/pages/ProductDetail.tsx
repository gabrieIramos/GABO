import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { motion } from 'motion/react';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 text-center">
        <p className="text-xl">Produto não encontrado</p>
        <Link to="/" className="underline mt-4 inline-block">
          Voltar para Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
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

    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#F5F5F5] overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-[#F5F5F5] overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-black' : ''
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
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">
              {product.team}
            </p>
            <h1 className="text-3xl md:text-4xl tracking-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-black'
                        : 'fill-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews.length} avaliações)
              </span>
            </div>
            <p className="text-2xl">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block uppercase tracking-wider text-sm mb-3">
              Selecione o Tamanho
            </label>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-4 border-2 transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Adicionar ao Carrinho
          </button>

          {/* Description */}
          <div className="border-t pt-6">
            <h3 className="uppercase tracking-wider text-sm mb-3">Descrição</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="text-2xl tracking-tight mb-8">Avaliações</h2>
          <div className="space-y-6 max-w-3xl">
            {product.reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b pb-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-black' : 'fill-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{review.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
