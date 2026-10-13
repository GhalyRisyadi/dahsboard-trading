<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSignalsStore } from '@/stores/signals'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import SideBadge from '@/features/signals/SideBadge.vue'
import type { Column } from '@/types/table'
import type { SignalSide } from '@/types/signals'

const store = useSignalsStore()
const { signals, loading, error } = storeToRefs(store)

const columns: Column[] = [
  { key: 'createdAt', label: 'Waktu' },
  { key: 'symbol', label: 'Pair' },
  { key: 'side', label: 'Aksi' },
  { key: 'confidence', label: 'Keyakinan', align: 'right' },
  { key: 'timeframe', label: 'Timeframe' },
  { key: 'reason', label: 'Alasan' },
]

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => store.fetchSignals())
</script>

<template>
  <BaseCard title="Sinyal AI">
    <p class="mb-3 rounded bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
      Data contoh. Belum terhubung ke model AI, jangan dipakai untuk keputusan trading.
    </p>
    <p v-if="loading" class="text-sm text-gray-400">Memuat sinyal...</p>
    <p v-else-if="error" class="text-sm text-red-400">{{ error }}</p>
    <BaseTable v-else :columns="columns" :rows="signals" row-key="id">
      <template #cell-createdAt="{ value }">{{ formatTime(Number(value)) }}</template>
      <template #cell-side="{ value }"><SideBadge :side="value as SignalSide" /></template>
      <template #cell-confidence="{ value }">{{ Number(value) }}%</template>
    </BaseTable>
  </BaseCard>
</template>
