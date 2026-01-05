const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface AddressPayload {
  label: string;
  recipient: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zip: string;
}

export interface Address extends AddressPayload {
  id: string;
}

async function withAuthFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Erro na requisição');
  }
  return res.json();
}

export async function fetchAddresses(token: string): Promise<Address[]> {
  return withAuthFetch('/addresses', token, { method: 'GET' });
}

export async function createAddress(token: string, payload: AddressPayload): Promise<Address> {
  return withAuthFetch('/addresses', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
