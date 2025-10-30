// src/services/api.ts
import axios from 'axios'

// 🔹 Buat instance axios global
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔹 Tambahkan interceptor untuk token JWT
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || 'auth_token'
    const token = localStorage.getItem(tokenKey)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// 🔹 Tangani error global (misal: token invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('🔒 Token invalid atau expired — redirect ke login')
      if (typeof window !== 'undefined') {
        localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || 'auth_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
