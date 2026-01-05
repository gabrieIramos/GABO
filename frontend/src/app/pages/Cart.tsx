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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">
            Adicione produtos para continuar comprando
          </p>
          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-3 uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
      <h1 className="text-3xl md:text-4xl tracking-tight mb-8">Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 border-b pb-4"
            >
              <div className="w-24 h-24 bg-[#F5F5F5] flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4 mb-2">
                  <div>
                    <h3 className="truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.team}</p>
                    <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                  </div>
                  <p className="flex-shrink-0">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-gray-500 hover:text-black"
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
          <div className="bg-[#F5F5F5] p-6 space-y-4">
            <h2 className="text-xl uppercase tracking-wider">Resumo</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete Estimado</span>
                <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-block text-center bg-black text-white py-4 uppercase tracking-wider hover:bg-gray-900 transition-colors"
            >
              Finalizar Compra
            </Link>

            <Link
              to="/"
              className="block text-center underline text-sm hover:no-underline"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
