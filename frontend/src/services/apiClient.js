import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Limpiamos la URL para evitar posibles barras finales dobles
const cleanedUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL

const apiClient = axios.create({
  baseURL: `${cleanedUrl}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
