import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 30 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-zinc-700" />
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tighter mb-3 sm:mb-4">Seu carrinho está vazio</h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8">
              Adicione produtos para continuar comprando
            </p>
            <Link
              to="/products"
              className="inline-block bg-lime-400 text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-black uppercase tracking-wider hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] transition-all duration-300"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tighter mb-6 sm:mb-8">Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-3 sm:gap-4 border-b border-zinc-800 pb-3 sm:pb-4 bg-zinc-900/30 p-3 sm:p-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-950 flex-shrink-0 border border-zinc-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2 sm:gap-4 mb-2">
                  <div>
                    <h3 className="truncate text-sm sm:text-base text-white font-bold">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">{item.team}</p>
                    <p className="text-xs sm:text-sm text-zinc-500">Tamanho: {item.size}</p>
                  </div>
                  <p className="flex-shrink-0 text-sm sm:text-base text-lime-400 font-black">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="w-7 h-7 sm:w-8 sm:h-8 border border-zinc-700 bg-zinc-900 text-white flex items-center justify-center hover:border-lime-400 transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-10 sm:w-12 text-center text-sm sm:text-base text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-7 h-7 sm:w-8 sm:h-8 border border-zinc-700 bg-zinc-900 text-white flex items-center justify-center hover:border-lime-400 transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                    aria-label="Remover item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl uppercase tracking-[0.2em] font-black text-white">Resumo</h2>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Frete Estimado</span>
                <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-3 sm:pt-4">
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-black text-white">Total</span>
                <span className="font-black text-lime-400">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-block text-center bg-lime-400 text-black py-3 sm:py-4 text-sm sm:text-base font-black uppercase tracking-wider hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] transition-all duration-300"
            >
              Finalizar Compra
            </Link>

            <Link
              to="/products"
              className="block text-center text-xs sm:text-sm text-lime-400 hover:text-lime-300 uppercase tracking-wider transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
