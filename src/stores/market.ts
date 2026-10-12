import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ticker } from '@/types/market'
import { getTickers } from '@/services/market'

export const useMarketStore = defineStore('market', () => {
  const tickers = ref<Ticker[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTickers() {
    loading.value = true
    error.value = null
    try {
      tickers.value = await getTickers()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat data'
    } finally {
      loading.value = false
    }
  }

  return { tickers, loading, error, fetchTickers }
})
