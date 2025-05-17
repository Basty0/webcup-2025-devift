import axios from 'axios';

// Configure le token CSRF pour toutes les requêtes
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

export default axios;
