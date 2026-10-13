import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Signal } from '@/types/signals'
import { getSignals } from '@/services/signals'

export const useSignalsStore = defineStore('signals', () => {
  const signals = ref<Signal[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSignals() {
    loading.value = true
    error.value = null
    try {
      signals.value = await getSignals()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat sinyal'
    } finally {
      loading.value = false
    }
  }

  return { signals, loading, error, fetchSignals }
})
