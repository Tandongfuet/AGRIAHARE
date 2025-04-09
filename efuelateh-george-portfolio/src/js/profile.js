import { showMessage, redirectIfNoToken, getElement, formatDate } from './utils.js';
import { getProfile, updateProfile } from './api.js';

export async function loadProfile() {
  redirectIfNoToken();

  try {
    const data = await getProfile();

    // Populate view form
    getElement('viewName').value = data.name || '';
    getElement('viewEmail').value = data.email || '';
    getElement('viewCreated').value = formatDate(data.createdAt);

    // Prefill edit form
    getElement('editName').value = data.name || '';
    getElement('editEmail').value = data.email || '';

  } catch (err) {
    showMessage('editMsg', err.message || 'Failed to load profile', true);
  }
}

export async function saveProfile(e) {
  e.preventDefault();
  const name = getElement('editName').value;
  const email = getElement('editEmail').value;

  try {
    const res = await updateProfile({ name, email });
    showMessage('editMsg', res.message || 'Profile updated successfully.');
    await loadProfile();
    showViewForm();
  } catch (err) {
    showMessage('editMsg', err.message || 'Update failed.', true);
  }
}

// View/edit form togglers (attached globally if needed)
window.enableEditMode = function () {
  getElement('viewProfileForm').style.display = 'none';
  getElement('editProfileForm').style.display = 'flex';
};

window.showViewForm = function () {
  getElement('editProfileForm').style.display = 'none';
  getElement('viewProfileForm').style.display = 'flex';
};