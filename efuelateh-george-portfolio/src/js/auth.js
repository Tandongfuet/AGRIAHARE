import { showMessage } from './utils.js';
import { loginUser, registerUser } from './api.js';

export async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const data = await loginUser({ email, password }); // Auth request
    localStorage.setItem('accessToken', data.accessToken); // Save token
    window.location.href = './account.html'; // ✅ Redirect to dashboard
  } catch (err) {
    showMessage('loginMsg', err.message, true); // Error feedback
  }
}

export async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const data = await registerUser({ name, email, password });
    showMessage('registerMsg', data.message || 'Registration successful.');
    window.location.href = './login.html';
  } catch (err) {
    showMessage('registerMsg', err.message, true);
  }
}
