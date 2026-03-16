import apiClient from './apiClient'

export async function sendContactMessage(payload) {
  const { data } = await apiClient.post('/contact', payload)
  return data
}
