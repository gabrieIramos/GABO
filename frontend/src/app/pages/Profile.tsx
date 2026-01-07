import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, Package, Users as UsersIcon, LogOut, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { fetchAllUsers, fetchAllOrders, createProduct, updateProduct, deleteProduct, User as UserType, Order, ProductFormData } from '../services/adminApi';
import { fetchProducts, Product } from '../services/productsApi';

type Tab = 'data' | 'address' | 'orders' | 'admin-products' | 'admin-orders' | 'admin-users';

export function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, clearSession, token } = useAuthStore();
  const showToast = useToastStore((s) => s.showToast);
  
  const [activeTab, setActiveTab] = useState<Tab>('data');
  const [loading, setLoading] = useState(false);
  
  // Admin states
  const [users, setUsers] = useState<UserType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAdmin() && token) {
      if (activeTab === 'admin-users') loadUsers();
      if (activeTab === 'admin-orders') loadOrders();
      if (activeTab === 'admin-products') loadProducts();
    }
  }, [activeTab, token]);

  async function loadUsers() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAllUsers(token);
      setUsers(data);
    } catch (err) {
      showToast({ title: 'Erro ao carregar usuários', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function loadOrders() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAllOrders(token);
      setOrders(data);
    } catch (err) {
      showToast({ title: 'Erro ao carregar pedidos', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      showToast({ title: 'Erro ao carregar produtos', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!token || !confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await deleteProduct(token, id);
      showToast({ title: 'Produto excluído', variant: 'success' });
      loadProducts();
    } catch (err) {
      showToast({ title: 'Erro ao excluir produto', variant: 'error' });
    }
  }

  function handleLogout() {
    clearSession();
    navigate('/');
  }

  const adminTabs = isAdmin()
    ? [
        { id: 'admin-products' as Tab, label: 'Produtos', icon: Package },
        { id: 'admin-orders' as Tab, label: 'Pedidos', icon: ShoppingBag },
        { id: 'admin-users' as Tab, label: 'Usuários', icon: UsersIcon },
      ]
    : [];

  const clientTabs = [
    { id: 'data' as Tab, label: 'Meus Dados', icon: User },
    { id: 'address' as Tab, label: 'Endereços', icon: MapPin },
    { id: 'orders' as Tab, label: 'Pedidos', icon: ShoppingBag },
  ];

  const tabs = isAdmin() ? adminTabs : clientTabs;

  // Default tab for admin
  useEffect(() => {
    if (isAdmin()) {
      setActiveTab('admin-products');
    }
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl tracking-tight">Meu Perfil</h1>
          {user && <p className="text-sm text-gray-600 mt-1">{user.email}</p>}
          {isAdmin() && <span className="inline-block mt-2 bg-black text-white text-xs px-2 py-1 uppercase">Admin</span>}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

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
                  <label className="block text-sm uppercase tracking-wider mb-2">Nome Completo</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ''}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
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
              <h2 className="text-2xl mb-6">Endereços</h2>
              <p className="text-gray-600">Gerencie seus endereços de entrega.</p>
            </div>
          )}

          {activeTab === 'orders' && !isAdmin() && (
            <div>
              <h2 className="text-2xl mb-6">Meus Pedidos</h2>
              <p className="text-gray-600">Visualize seu histórico de pedidos.</p>
            </div>
          )}

          {/* ADMIN: Produtos */}
          {activeTab === 'admin-products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">Gestão de Produtos</h2>
                <button
                  onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm uppercase hover:bg-gray-900"
                >
                  <Plus className="w-4 h-4" /> Adicionar Produto
                </button>
              </div>

              {loading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border p-4 space-y-2">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover" />
                      )}
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.team}</p>
                      <p className="font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                      <p className="text-xs text-gray-500">Estoque: {product.stock}</p>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                          className="flex-1 flex items-center justify-center gap-1 border px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          <Pencil className="w-3 h-3" /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 flex items-center justify-center gap-1 border border-red-300 text-red-700 px-3 py-2 text-sm hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" /> Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showProductForm && (
                <ProductFormModal
                  product={editingProduct}
                  onClose={() => { setShowProductForm(false); setEditingProduct(null); }}
                  onSave={() => { setShowProductForm(false); setEditingProduct(null); loadProducts(); }}
                  token={token || ''}
                />
              )}
            </div>
          )}

          {/* ADMIN: Pedidos */}
          {activeTab === 'admin-orders' && (
            <div>
              <h2 className="text-2xl mb-6">Todos os Pedidos</h2>
              {loading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">{order.user.name} ({order.user.email})</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">R$ {order.totalAmount.toFixed(2).replace('.', ',')}</p>
                          <span className="text-xs bg-gray-100 px-2 py-1">{order.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-gray-600">Nenhum pedido encontrado.</p>}
                </div>
              )}
            </div>
          )}

          {/* ADMIN: Usuários */}
          {activeTab === 'admin-users' && (
            <div>
              <h2 className="text-2xl mb-6">Usuários Cadastrados</h2>
              {loading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
                </div>
              ) : (
                <div className="border">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs uppercase">Nome</th>
                        <th className="px-4 py-3 text-left text-xs uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs uppercase">Role</th>
                        <th className="px-4 py-3 text-left text-xs uppercase">Cadastro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{u.name}</td>
                          <td className="px-4 py-3">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 ${u.role === 'admin' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && <p className="px-4 py-6 text-gray-600 text-center">Nenhum usuário encontrado.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal para criar/editar produto
function ProductFormModal({ product, onClose, onSave, token }: { product: Product | null; onClose: () => void; onSave: () => void; token: string }) {
  const showToast = useToastStore((s) => s.showToast);
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    team: product?.team || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
    sizes: product?.sizes || [],
    stock: product?.stock || 0,
    isNew: product?.isNew || false,
    images: product?.images || [],
  });
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        await updateProduct(token, product.id, formData, newFiles, existingImages);
        showToast({ title: 'Produto atualizado', variant: 'success' });
      } else {
        await createProduct(token, formData, newFiles, existingImages);
        showToast({ title: 'Produto criado', variant: 'success' });
      }
      onSave();
    } catch (err) {
      showToast({ title: 'Erro ao salvar produto', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{product ? 'Editar Produto' : 'Novo Produto'}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              type="text"
              className="w-full border px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Time/Seleção</label>
              <input
                type="text"
                className="w-full border px-3 py-2"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Categoria</label>
              <select
                className="w-full border px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Selecione...</option>
                <option value="Seleções">Seleções</option>
                <option value="Clubes">Clubes</option>
                <option value="Brasileirão">Brasileirão</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border px-3 py-2"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Estoque</label>
              <input
                type="number"
                className="w-full border px-3 py-2"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Descrição</label>
            <textarea
              className="w-full border px-3 py-2"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Tamanhos (separados por vírgula)</label>
            <input
              type="text"
              className="w-full border px-3 py-2"
              value={formData.sizes.join(', ')}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(',').map(s => s.trim()) })}
              placeholder="P, M, G, GG"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Imagens do produto</label>
            <div
              className={`border-2 border-dashed p-3 ${isDragging ? 'border-black bg-black/5' : 'border-gray-300'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = Array.from(e.dataTransfer?.files || []);
                if (files.length) setNewFiles((prev) => [...prev, ...files]);
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative border">
                    <img src={img} alt={`Imagem ${idx+1}`} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white/80 border px-2 py-1 text-xs"
                      onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                    >
                      Remover
                    </button>
                  </div>
                ))}
                {newFiles.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative border">
                    <img src={URL.createObjectURL(file)} alt={`Novo ${idx+1}`} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white/80 border px-2 py-1 text-xs"
                      onClick={() => setNewFiles(newFiles.filter((_, i) => i !== idx))}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center text-xs text-gray-600 py-2">
                Arraste e solte imagens aqui ou selecione abaixo
              </div>
            </div>
            <div className="pt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setNewFiles([...newFiles, ...files]);
                }}
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              />
              <span className="text-sm">Produto novo / Lançamento</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 border px-4 py-2 hover:bg-gray-100">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-black text-white px-4 py-2 hover:bg-gray-900 disabled:opacity-50">
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
