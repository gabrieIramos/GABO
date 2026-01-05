import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts, FilterParams, Product } from '../services/productsApi';
import { useToastStore } from '../store/useToastStore';

const SIZES = ['P', 'M', 'G', 'GG'];
const CATEGORIES = ['Clubes', 'Seleções', 'Brasileirão', 'Lançamento'];
const PRICE_RANGES = [
  { label: 'Até R$ 300', min: 0, max: 300 },
  { label: 'R$ 300 - R$ 400', min: 300, max: 400 },
  { label: 'Acima de R$ 400', min: 400, max: Infinity },
];

export function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Ler filtros direto dos searchParams (source of truth)
  const search = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedPriceRange = {
    min: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    max: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
  };
  const isNew = searchParams.get('isNew') === 'true';
  const sortBy = (searchParams.get('sortBy') as 'price_asc' | 'price_desc' | 'newest') || 'newest';

  // Carregar produtos quando os filtros mudam
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const filters: FilterParams = {
          search: search || undefined,
          category: selectedCategory || undefined,
          size: selectedSize || undefined,
          isNew: isNew ? true : undefined,
          minPrice: selectedPriceRange.min !== undefined ? Number(selectedPriceRange.min) : undefined,
          maxPrice: selectedPriceRange.max !== undefined ? Number(selectedPriceRange.max) : undefined,
          sortBy,
        };

        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (err) {
        console.error(err);
        showToast({
          title: 'Erro ao carregar produtos',
          description: 'Tente novamente mais tarde.',
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [searchParams, showToast]);

  function updateFilterParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams(new URLSearchParams());
  }

  const hasActiveFilters =
    search || selectedCategory || selectedSize || selectedPriceRange.min || selectedPriceRange.max || isNew;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl tracking-tight">Todos os Produtos</h1>
        <Link to="/" className="text-xs md:text-sm underline text-gray-600 hover:text-black">
          Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full border px-4 py-3 text-sm uppercase tracking-wider font-semibold flex items-center justify-between hover:bg-[#F5F5F5] transition-colors"
          >
            Filtros
            <svg
              className={`w-4 h-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Sidebar Filters - Desktop always visible, Mobile conditional */}
        <aside
          className={`lg:col-span-1 space-y-6 ${
            isFiltersOpen ? 'block' : 'hidden'
          } lg:block border-t lg:border-t-0 pt-6 lg:pt-0`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg uppercase tracking-wide">Filtros</h2>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs underline text-gray-600 hover:text-black">
                Limpar
              </button>
            )}
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="text-xs md:text-sm uppercase tracking-wider font-semibold">Buscar</label>
            <input
              type="text"
              placeholder="Nome ou descrição..."
              value={search}
              onChange={(e) => updateFilterParam('search', e.target.value || null)}
              className="w-full border px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm uppercase tracking-wider font-semibold">Categoria</label>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-xs md:text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => updateFilterParam('category', cat)}
                  />
                  {cat}
                </label>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => updateFilterParam('category', null)}
                  className="text-xs underline text-gray-600"
                >
                  Limpar categoria
                </button>
              )}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm uppercase tracking-wider font-semibold">Tamanho</label>
            <div className="space-y-2">
              {SIZES.map((size) => (
                <label key={size} className="flex items-center gap-2 text-xs md:text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    checked={selectedSize === size}
                    onChange={() => updateFilterParam('size', size)}
                  />
                  {size}
                </label>
              ))}
              {selectedSize && (
                <button
                  onClick={() => updateFilterParam('size', null)}
                  className="text-xs underline text-gray-600"
                >
                  Limpar tamanho
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm uppercase tracking-wider font-semibold">Preço</label>
            <div className="space-y-2">
              {PRICE_RANGES.map((range, idx) => (
                <label key={idx} className="flex items-center gap-2 text-xs md:text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange.min === range.min && selectedPriceRange.max === range.max}
                    onChange={() => {
                      const params = new URLSearchParams(searchParams);
                      if (range.min !== 0) {
                        params.set('minPrice', String(range.min));
                      } else {
                        params.delete('minPrice');
                      }
                      if (range.max === Infinity) {
                        params.delete('maxPrice');
                      } else {
                        params.set('maxPrice', String(range.max));
                      }
                      setSearchParams(params);
                    }}
                  />
                  {range.label}
                </label>
              ))}
              {(selectedPriceRange.min !== undefined || selectedPriceRange.max !== undefined) && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('minPrice');
                    params.delete('maxPrice');
                    setSearchParams(params);
                  }}
                  className="text-xs underline text-gray-600"
                >
                  Limpar preço
                </button>
              )}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs md:text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  if (e.target.checked) {
                    params.set('isNew', 'true');
                  } else {
                    params.delete('isNew');
                  }
                  setSearchParams(params);
                }}
              />
              <span className="uppercase tracking-wider font-semibold">Apenas Lançamentos</span>
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-3">
            <p className="text-xs md:text-sm text-gray-600">
              {loading ? 'Carregando...' : `${products.length} produto(s) encontrado(s)`}
            </p>
            <select
              value={sortBy}
              onChange={(e) => updateFilterParam('sortBy', e.target.value === 'newest' ? null : e.target.value)}
              className="border px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="newest">Mais novos</option>
              <option value="price_asc">Preço: Crescente</option>
              <option value="price_desc">Preço: Decrescente</option>
            </select>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm md:text-base text-gray-600 mb-4">Nenhum produto encontrado com esses filtros.</p>
              <button
                onClick={resetFilters}
                className="text-xs md:text-sm underline hover:text-black"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
