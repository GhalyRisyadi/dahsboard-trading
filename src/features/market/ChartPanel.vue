<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts'
import BaseCard from '@/components/ui/BaseCard.vue'
import { getKlines } from '@/services/market'
import { connectKlineStream } from '@/services/marketStream'
import type { Candle, ChartInterval } from '@/types/market'

const props = defineProps<{ symbol: string }>()

const intervals: ChartInterval[] = ['1m', '5m', '15m', '1h', '4h', '1d']
const interval = ref<ChartInterval>('1m')
const loading = ref(false)
const error = ref<string | null>(null)
const connected = ref(false)
const container = ref<HTMLDivElement | null>(null)

// Objek chart dari library sengaja tidak dibungkus ref agar tidak diubah jadi proxy reaktif.
let chart: IChartApi | null = null
let series: ISeriesApi<'Candlestick'> | null = null
let disconnect: (() => void) | null = null
let requestId = 0

function toChartCandle(candle: Candle) {
  return { ...candle, time: candle.time as UTCTimestamp }
}

function stopStream() {
  disconnect?.()
  disconnect = null
  connected.value = false
}

async function load() {
  if (!series) return

  // Setiap pemanggilan punya nomor sendiri. Hasil dari pemanggilan lama diabaikan
  // kalau pengguna sudah berganti pair atau interval sebelum datanya sampai.
  const currentRequest = ++requestId
  stopStream()
  loading.value = true
  error.value = null

  try {
    const candles = await getKlines(props.symbol, interval.value)
    if (currentRequest !== requestId) return

    series.setData(candles.map(toChartCandle))
    chart?.timeScale().fitContent()

    disconnect = connectKlineStream(props.symbol, interval.value, {
      onCandle: (candle) => series?.update(toChartCandle(candle)),
      onStatusChange: (isConnected) => {
        connected.value = isConnected
      },
    })
  } catch (e) {
    if (currentRequest !== requestId) return
    error.value = e instanceof Error ? e.message : 'Gagal memuat chart'
  } finally {
    if (currentRequest === requestId) loading.value = false
  }
}

onMounted(() => {
  if (!container.value) return

  chart = createChart(container.value, {
    autoSize: true,
    layout: {
      background: { type: ColorType.Solid, color: 'transparent' },
      textColor: '#9ca3af',
    },
    grid: {
      vertLines: { color: '#1f2937' },
      horzLines: { color: '#1f2937' },
    },
    timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#374151' },
    rightPriceScale: { borderColor: '#374151' },
  })

  series = chart.addSeries(CandlestickSeries, {
    upColor: '#22c55e',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#22c55e',
    wickDownColor: '#ef4444',
  })

  load()
})

watch([() => props.symbol, interval], load)

onUnmounted(() => {
  requestId++
  stopStream()
  chart?.remove()
  chart = null
  series = null
})
</script>

<template>
  <BaseCard :title="`Chart ${symbol}`">
    <div class="mb-3 flex items-center justify-between">
      <div class="flex gap-1">
        <button
          v-for="item in intervals"
          :key="item"
          type="button"
          class="rounded px-2 py-1 text-xs"
          :class="item === interval ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'"
          @click="interval = item"
        >
          {{ item }}
        </button>
      </div>
      <span v-if="loading" class="text-xs text-gray-400">Memuat chart...</span>
      <span v-else class="text-xs" :class="connected ? 'text-green-400' : 'text-gray-500'">
        {{ connected ? '● Live' : '○ Tidak terhubung' }}
      </span>
    </div>
    <p v-if="error" class="mb-2 text-sm text-red-400">{{ error }}</p>
    <div ref="container" class="h-96 w-full"></div>
  </BaseCard>
</template>
