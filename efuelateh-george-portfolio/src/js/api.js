const API_BASE = 'http://localhost:9099/api/auth';

const getToken = () => localStorage.getItem('accessToken');

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export async function getProfile() {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: headers(),
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Could not fetch profile');
  return res.json();
}

export async function updateProfile(profile) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify(profile)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data;
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

export async function logoutUser() {
  await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  localStorage.removeItem('accessToken');
}
