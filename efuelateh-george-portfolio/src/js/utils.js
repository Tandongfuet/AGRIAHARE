export function showMessage(id, message, isError = false) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.className = 'message' + (isError ? ' error' : '');
  }
  
  export function getElement(id) {
    return document.getElementById(id);
  }
  
  export function formatDate(dateString) {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
  
  export function redirectIfNoToken(path = '/login.html') {
    if (!localStorage.getItem('accessToken')) {
      window.location.href = path;
    }
  }
  