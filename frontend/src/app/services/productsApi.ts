const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  images: string[];
  description: string;
  isNew: boolean;
  category: string;
  sizes: string[];
  rating: number;
  stock: number;
  reviews?: any[];
}

export interface FilterParams {
  category?: string;
  team?: string;
  size?: string;
  search?: string;
  isNew?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
}

function normalizeProduct(product: any): Product {
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  };
}

function buildQueryString(params: FilterParams): string {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.team) query.append('team', params.team);
  if (params.size) query.append('size', params.size);
  if (params.search) query.append('search', params.search);
  if (params.isNew !== undefined) query.append('isNew', String(params.isNew));
  if (params.minPrice !== undefined) query.append('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) query.append('maxPrice', String(params.maxPrice));
  if (params.sortBy) query.append('sortBy', params.sortBy);
  return query.toString();
}

export async function fetchProducts(filters?: FilterParams): Promise<Product[]> {
  const qs = filters ? `?${buildQueryString(filters)}` : '';
  const res = await fetch(`${API_BASE}/products${qs}`);
  if (!res.ok) {
    throw new Error('Falha ao buscar produtos');
  }
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error('Produto não encontrado');
  }
  const data = await res.json();
  return normalizeProduct(data);
}
