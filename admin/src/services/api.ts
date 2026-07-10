import axios from 'axios'

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const baseURL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
})

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
