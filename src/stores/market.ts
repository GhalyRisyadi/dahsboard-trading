import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ticker } from '@/types/market'
import { WATCHLIST, getTickers } from '@/services/market'
import { connectTickerStream } from '@/services/marketStream'

export const useMarketStore = defineStore('market', () => {
  const tickers = ref<Ticker[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const connected = ref(false)

  let disconnect: (() => void) | null = null

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

  function applyUpdate(update: Ticker) {
    const index = tickers.value.findIndex((ticker) => ticker.symbol === update.symbol)
    if (index === -1) {
      tickers.value.push(update)
    } else {
      tickers.value[index] = update
    }
  }

  function startStream() {
    if (disconnect) return
    disconnect = connectTickerStream(WATCHLIST, {
      onTicker: applyUpdate,
      onStatusChange: (isConnected) => {
        connected.value = isConnected
      },
    })
  }

  function stopStream() {
    disconnect?.()
    disconnect = null
    connected.value = false
  }

  return { tickers, loading, error, connected, fetchTickers, startStream, stopStream }
})
