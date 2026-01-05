import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Home, LogIn, MapPin, CreditCard, Wallet, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';
import { Address, AddressPayload, fetchAddresses, createAddress } from '../services/checkoutApi';

const steps = ['Autenticação', 'Endereço', 'Pagamento'] as const;
type Step = (typeof steps)[number];
type PaymentMethod = 'pix' | 'card';

const emptyAddress: AddressPayload = {
  label: '',
  recipient: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  zip: '',
};

export function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useAuthStore();
  const { items, getTotalPrice } = useCartStore();
  const showToast = useToastStore((state) => state.showToast);

  const [step, setStep] = useState<Step>('Autenticação');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddress);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const subtotal = getTotalPrice();
  const shipping = items.length > 0 ? 30 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  useEffect(() => {
    if (isAuthenticated && step === 'Endereço' && token) {
      loadAddresses(token);
    }
  }, [isAuthenticated, step, token]);

  async function loadAddresses(authToken: string) {
    setAddressesLoading(true);
    try {
      const data = await fetchAddresses(authToken);
      setAddresses(data);
      if (data.length) {
        setSelectedAddressId(data[0].id);
      }
    } catch (err) {
      console.error(err);
      showToast({ title: 'Não foi possível carregar endereços', description: 'Cadastre um novo para continuar.', variant: 'error' });
    } finally {
      setAddressesLoading(false);
    }
  }

  const canContinueAuth = isAuthenticated;
  const canContinueAddress = Boolean(selectedAddressId || addressForm.recipient);

  const paymentSummary = useMemo(
    () => (paymentMethod === 'pix' ? 'Pix (imediato)' : 'Cartão de Crédito'),
    [paymentMethod],
  );

  function handleProceedFromAuth() {
    if (!isAuthenticated) {
      showToast({
        title: 'Faça login para continuar',
        description: 'Entre ou cadastre-se para finalizar sua compra.',
        variant: 'error',
      });
      return;
    }
    setStep('Endereço');
  }

  async function handleSaveAddress() {
    if (!token) return;
    try {
      const created = await createAddress(token, addressForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created.id);
      setAddressForm(emptyAddress);
      showToast({ title: 'Endereço salvo', variant: 'success' });
    } catch (err) {
      console.error(err);
      showToast({
        title: 'Erro ao salvar endereço',
        description: 'Tente novamente ou verifique os dados.',
        variant: 'error',
      });
    }
  }

  function handleFinish() {
    showToast({
      title: 'Pedido iniciado',
      description: `${paymentSummary} • Total R$ ${total.toFixed(2).replace('.', ',')}`,
      variant: 'success',
    });
    // TODO: enviar pedido para backend
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10 space-y-10">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">Checkout</p>
          <h1 className="text-3xl md:text-4xl tracking-tight">Finalize sua compra</h1>
        </div>
        <div className="flex gap-2 text-sm">
          {steps.map((s, idx) => {
            const completed = steps.indexOf(step) > idx;
            const active = step === s;
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    active ? 'bg-black text-white border-black' : completed ? 'bg-green-100 text-green-800 border-green-200' : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={active ? 'font-semibold' : 'text-gray-600'}>{s}</span>
                {idx < steps.length - 1 && <span className="text-gray-300">/</span>}
              </div>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-6">
          {step === 'Autenticação' && (
            <section className="border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <LogIn className="w-5 h-5" />
                <div>
                  <h2 className="text-lg font-semibold">Entrar ou cadastrar</h2>
                  <p className="text-sm text-gray-600">Precisamos confirmar sua conta para continuar.</p>
                </div>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Você está logado{user?.name ? ` como ${user.name}` : ''}.</span>
                </div>
              ) : (
                <div className="space-y-5 text-sm">
                  <p>Não encontramos sessão ativa. Faça login ou crie uma conta.</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/profile"
                      className="bg-black text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-900"
                    >
                      Fazer login / cadastrar
                    </a>
                    <a
                      href="/"
                      className="underline px-4 py-2 text-gray-700 hover:text-black"
                    >
                      Voltar às compras
                    </a>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleProceedFromAuth}
                  className="bg-black text-white px-5 py-3 uppercase tracking-wide hover:bg-gray-900 disabled:opacity-50"
                  disabled={!canContinueAuth}
                >
                  Continuar
                </button>
              </div>
            </section>
          )}

          {step === 'Endereço' && (
            <section className="border p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <div>
                  <h2 className="text-lg font-semibold">Endereço de entrega</h2>
                  <p className="text-sm text-gray-600">Escolha um endereço salvo ou cadastre um novo.</p>
                </div>
              </div>

              {addressesLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando endereços...
                </div>
              ) : (
                <div className="grid gap-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`border p-4 cursor-pointer transition ${
                        selectedAddressId === addr.id ? 'border-black bg-black/5' : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold">{addr.label || addr.recipient}</p>
                          <p className="text-gray-700">{addr.recipient}</p>
                          <p className="text-gray-700">{`${addr.street}, ${addr.number}${addr.complement ? ` - ${addr.complement}` : ''}`}</p>
                          <p className="text-gray-700">{`${addr.district}, ${addr.city} - ${addr.state}`}</p>
                          <p className="text-gray-500">CEP {addr.zip}</p>
                        </div>
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide">Cadastrar novo endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <input
                    className="border px-3 py-2"
                    placeholder="Identificação (Casa, Trabalho...)"
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Destinatário"
                    value={addressForm.recipient}
                    onChange={(e) => setAddressForm({ ...addressForm, recipient: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Rua"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Número"
                    value={addressForm.number}
                    onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Complemento"
                    value={addressForm.complement}
                    onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Bairro"
                    value={addressForm.district}
                    onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Cidade"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="Estado"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2"
                    placeholder="CEP"
                    value={addressForm.zip}
                    onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAddress}
                    disabled={!token}
                    className="bg-black text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-900 disabled:opacity-50"
                  >
                    Salvar endereço
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button onClick={() => setStep('Autenticação')} className="text-sm underline">Voltar</button>
                <button
                  onClick={() => setStep('Pagamento')}
                  className="bg-black text-white px-5 py-3 uppercase tracking-wide hover:bg-gray-900 disabled:opacity-50"
                  disabled={!canContinueAddress}
                >
                  Continuar
                </button>
              </div>
            </section>
          )}

          {step === 'Pagamento' && (
            <section className="border p-6 space-y-6">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <div>
                  <h2 className="text-lg font-semibold">Pagamento</h2>
                  <p className="text-sm text-gray-600">Escolha Pix ou Cartão.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className={`border p-4 cursor-pointer ${paymentMethod === 'pix' ? 'border-black bg-black/5' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    <span className="font-semibold">Pix</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pagamento instantâneo com QR Code.</p>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'pix'}
                    onChange={() => setPaymentMethod('pix')}
                    className="mt-3"
                  />
                </label>

                <label className={`border p-4 cursor-pointer ${paymentMethod === 'card' ? 'border-black bg-black/5' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="font-semibold">Cartão</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pague com crédito.</p>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-3"
                  />
                </label>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="text-sm text-gray-700 bg-gray-50 border border-dashed border-gray-300 p-4">
                  Gere o QR Code após confirmar. O pedido é aprovado na hora após o pagamento.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <input className="border px-3 py-2" placeholder="Número do cartão" />
                  <input className="border px-3 py-2" placeholder="Nome impresso" />
                  <input className="border px-3 py-2" placeholder="Validade (MM/AA)" />
                  <input className="border px-3 py-2" placeholder="CVV" />
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <button onClick={() => setStep('Endereço')} className="text-sm underline">Voltar</button>
                <button
                  onClick={handleFinish}
                  className="bg-black text-white px-5 py-3 uppercase tracking-wide hover:bg-gray-900"
                >
                  Confirmar pagamento
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="border p-6 space-y-4 lg:sticky lg:top-24 h-fit">
          <h3 className="text-lg font-semibold">Resumo</h3>
          <div className="divide-y">
            <div className="space-y-3 pb-3">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Tam. {item.size}</p>
                  </div>
                  <p>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
              <div className="flex justify-between"><span>Frete</span><span>R$ {shipping.toFixed(2).replace('.', ',')}</span></div>
              <div className="flex justify-between font-semibold text-lg pt-2"><span>Total</span><span>R$ {total.toFixed(2).replace('.', ',')}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
