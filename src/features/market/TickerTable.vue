<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMarketStore } from '@/stores/market'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import PriceBadge from '@/components/ui/PriceBadge.vue'
import type { Column } from '@/types/table'

const store = useMarketStore()
const { tickers, loading, error } = storeToRefs(store)

const columns: Column[] = [
  { key: 'symbol', label: 'Pair' },
  { key: 'price', label: 'Harga', align: 'right' },
  { key: 'change24h', label: 'Perubahan 24 jam', align: 'right' },
  { key: 'volume24h', label: 'Volume 24 jam', align: 'right' },
]

function formatPrice(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

onMounted(() => store.fetchTickers())
</script>

<template>
  <BaseCard title="Harga Pasar">
    <p v-if="loading" class="text-sm text-gray-400">Memuat data...</p>
    <p v-else-if="error" class="text-sm text-red-400">{{ error }}</p>
    <BaseTable v-else :columns="columns" :rows="tickers" row-key="symbol">
      <template #cell-price="{ value }">{{ formatPrice(Number(value)) }}</template>
      <template #cell-change24h="{ value }"><PriceBadge :value="Number(value)" /></template>
      <template #cell-volume24h="{ value }">{{ Number(value).toLocaleString('en-US') }}</template>
    </BaseTable>
  </BaseCard>
</template>
