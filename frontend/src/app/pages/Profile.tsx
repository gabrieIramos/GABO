import { useState } from 'react';
import { User, MapPin, ShoppingBag } from 'lucide-react';

type Tab = 'data' | 'address' | 'orders';

export function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>('data');

  const tabs = [
    { id: 'data' as Tab, label: 'Meus Dados', icon: User },
    { id: 'address' as Tab, label: 'Endereços', icon: MapPin },
    { id: 'orders' as Tab, label: 'Pedidos', icon: ShoppingBag },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
      <h1 className="text-3xl md:text-4xl tracking-tight mb-8">Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'hover:bg-[#F5F5F5]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'data' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl mb-6">Dados Pessoais</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    defaultValue="João da Silva"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="joao@email.com"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    defaultValue="(11) 99999-9999"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 uppercase tracking-wider hover:bg-gray-900 transition-colors"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">Endereços</h2>
                <button className="text-sm underline hover:no-underline">
                  + Adicionar Novo
                </button>
              </div>

              <div className="border p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="uppercase tracking-wider text-sm text-gray-600 mb-2">
                      Endereço Principal
                    </p>
                    <p>Rua Exemplo, 123</p>
                    <p>Bairro Centro - São Paulo, SP</p>
                    <p>CEP: 01234-567</p>
                  </div>
                  <button className="text-sm underline hover:no-underline">
                    Editar
                  </button>
                </div>
              </div>

              <form className="mt-8 space-y-4">
                <h3 className="text-xl mb-4">Adicionar/Editar Endereço</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      placeholder="00000-000"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">
                    Rua
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">
                      Estado
                    </label>
                    <input
                      type="text"
                      placeholder="SP"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 uppercase tracking-wider hover:bg-gray-900 transition-colors"
                >
                  Salvar Endereço
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl mb-6">Meus Pedidos</h2>
              
              <div className="space-y-4">
                <div className="border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="uppercase tracking-wider text-sm text-gray-600">
                        Pedido #12345
                      </p>
                      <p className="text-sm text-gray-600">
                        Realizado em 02/01/2026
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 text-xs uppercase tracking-wider">
                      Entregue
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[#F5F5F5]">
                      <img
                        src="https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?w=200"
                        alt="Produto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p>Camisa Oficial 2024 - Brasil</p>
                      <p className="text-sm text-gray-600">Tamanho: M</p>
                      <p className="text-sm">R$ 349,90</p>
                    </div>
                  </div>
                </div>

                <div className="border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="uppercase tracking-wider text-sm text-gray-600">
                        Pedido #12344
                      </p>
                      <p className="text-sm text-gray-600">
                        Realizado em 28/12/2025
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 text-xs uppercase tracking-wider">
                      Em Trânsito
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[#F5F5F5]">
                      <img
                        src="https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=200"
                        alt="Produto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p>Jersey Home 24/25 - Real Madrid</p>
                      <p className="text-sm text-gray-600">Tamanho: G</p>
                      <p className="text-sm">R$ 399,90</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
