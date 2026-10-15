import type { Signal } from '@/types/signals'

// Alamat backend. Bisa diganti lewat VITE_API_URL di file .env.local.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function getSignals(): Promise<Signal[]> {
  let response: Response

  try {
    response = await fetch(`${API_URL}/signals`)
  } catch {
    throw new Error(`Tidak bisa menghubungi backend di ${API_URL}. Pastikan server berjalan.`)
  }

  if (!response.ok) {
    throw new Error(`Gagal memuat sinyal (HTTP ${response.status})`)
  }

  return response.json()
}
