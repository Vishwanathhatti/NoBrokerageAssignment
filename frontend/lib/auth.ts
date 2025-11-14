const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginAdmin(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
}

export async function registerAdmin(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  return result;
}

export function setAdminSession(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
}

export function isAdminAuthenticated(): boolean {
  const token = getAdminSession();
  return !!token;
}
