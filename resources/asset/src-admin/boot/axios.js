import axios from 'axios'

global.$ = axios.create({
  baseURL: location.origin,
  timeout: 5000,
  headers: {
    'X-CSRF-TOKEN': CSRF_TOKEN,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data'
  }
});
