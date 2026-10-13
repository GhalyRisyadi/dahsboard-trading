<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMarketStore } from '@/stores/market'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import PriceBadge from '@/components/ui/PriceBadge.vue'
import type { Column } from '@/types/table'

const store = useMarketStore()
const { tickers, loading, error, connected, selectedSymbol } = storeToRefs(store)

const columns: Column[] = [
  { key: 'symbol', label: 'Pair' },
  { key: 'price', label: 'Harga', align: 'right' },
  { key: 'change24h', label: 'Perubahan 24 jam', align: 'right' },
  { key: 'volume24h', label: 'Volume 24 jam (USDT)', align: 'right' },
]

function formatPrice(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

let active = true

onMounted(async () => {
  await store.fetchTickers()
  if (active && !store.error) store.startStream()
})

onUnmounted(() => {
  active = false
  store.stopStream()
})
</script>

<template>
  <BaseCard
    :columns="columns"
    :rows="tickers"
    row-key="symbol"
    :selected-key="selectedSymbol"
    @row-click="(row) => store.selectSymbol(row.symbol)"
  >
    <p v-if="loading" class="text-sm text-gray-400">Memuat data...</p>
    <p v-else-if="error" class="text-sm text-red-400">{{ error }}</p>
    <template v-else>
      <p class="mb-3 text-xs" :class="connected ? 'text-green-400' : 'text-gray-500'">
        {{ connected ? '● Live' : '○ Terputus, mencoba menyambung ulang...' }}
      </p>
      <BaseTable :columns="columns" :rows="tickers" row-key="symbol">
        <template #cell-price="{ value }">{{ formatPrice(Number(value)) }}</template>
        <template #cell-change24h="{ value }"><PriceBadge :value="Number(value)" /></template>
        <template #cell-volume24h="{ value }">
          {{ Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
        </template>
      </BaseTable>
    </template>
  </BaseCard>
</template>
