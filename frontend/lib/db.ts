const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProperties(filters?: {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  projectName?: string;
}) {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const queryParams = new URLSearchParams();
  if (filters?.location) queryParams.append('location', filters.location);
  if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
  if (filters?.projectName) queryParams.append('projectName', filters.projectName);

  const url = `${API_BASE_URL}/properties${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }

  const data = await response.json();
  return data;
}

export async function getPropertyById(id: string) {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }

  const data = await response.json();
  return data;
}

export async function createProperty(formData: FormData) {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/properties`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create property');
  }

  const data = await response.json();
  return data;
}

export async function updateProperty(id: string, formData: FormData) {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'PUT',
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update property');
  }

  const data = await response.json();
  return data;
}

export async function deleteProperty(id: string) {
  const token = localStorage.getItem('adminToken');

  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete property');
  }

  return true;
}
