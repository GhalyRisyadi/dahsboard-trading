<script setup lang="ts">
import { computed } from 'vue'
import type { SignalSide } from '@/types/signals'

const props = defineProps<{ side: SignalSide }>()

const colorClass = computed(() => {
  if (props.side === 'BUY') return 'bg-green-500/15 text-green-400'
  if (props.side === 'SELL') return 'bg-red-500/15 text-red-400'
  return 'bg-gray-500/15 text-gray-400'
})
</script>

<template>
  <span class="rounded px-2 py-0.5 text-xs font-medium" :class="colorClass">{{ side }}</span>
</template>
