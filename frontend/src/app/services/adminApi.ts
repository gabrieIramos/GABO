const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  createdAt: string;
}

export interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: any[];
}

export interface ProductFormData {
  name: string;
  team: string;
  price: number;
  description: string;
  category: string;
  sizes: string[];
  stock: number;
  isNew: boolean;
  images?: string[];
}

async function withAuthFetch(url: string, token: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(JSON.stringify(error));
  }
  return res.json();
}

// Users
export async function fetchAllUsers(token: string): Promise<User[]> {
  return withAuthFetch(`${API_BASE}/users`, token);
}

export async function deleteUser(token: string, userId: string): Promise<void> {
  await withAuthFetch(`${API_BASE}/users/${userId}`, token, { method: 'DELETE' });
}

// Orders
export async function fetchAllOrders(token: string): Promise<Order[]> {
  return withAuthFetch(`${API_BASE}/orders`, token);
}

// Products
export async function createProduct(token: string, data: ProductFormData, files: File[] = [], existingImages: string[] = []): Promise<any> {
  const fd = new FormData();
  fd.append('name', data.name);
  fd.append('team', data.team);
  fd.append('price', String(data.price));
  fd.append('description', data.description);
  fd.append('category', data.category);
  fd.append('stock', String(data.stock));
  fd.append('isNew', String(data.isNew));
  data.sizes.forEach(s => fd.append('sizes', s));
  existingImages.forEach(url => fd.append('images', url));
  files.forEach(file => fd.append('images', file));
  return withAuthFetch(`${API_BASE}/products`, token, {
    method: 'POST',
    body: fd,
  });
}

export async function updateProduct(
  token: string,
  productId: string,
  data: Partial<ProductFormData>,
  files: File[] = [],
  existingImages: string[] = []
): Promise<any> {
  const fd = new FormData();
  if (data.name) fd.append('name', data.name);
  if (data.team) fd.append('team', data.team);
  if (data.price !== undefined) fd.append('price', String(data.price));
  if (data.description) fd.append('description', data.description);
  if (data.category) fd.append('category', data.category);
  if (data.stock !== undefined) fd.append('stock', String(data.stock));
  if (data.isNew !== undefined) fd.append('isNew', String(data.isNew));
  if (data.sizes) data.sizes.forEach(s => fd.append('sizes', s));
  existingImages.forEach(url => fd.append('images', url));
  files.forEach(file => fd.append('images', file));
  return withAuthFetch(`${API_BASE}/products/${productId}`, token, {
    method: 'PATCH',
    body: fd,
  });
}

export async function deleteProduct(token: string, productId: string): Promise<void> {
  await withAuthFetch(`${API_BASE}/products/${productId}`, token, { method: 'DELETE' });
}
