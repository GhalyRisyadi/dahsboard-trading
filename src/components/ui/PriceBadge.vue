<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: number }>()

const colorClass = computed(() => {
  if (props.value > 0) return 'bg-green-500/15 text-green-400'
  if (props.value < 0) return 'bg-red-500/15 text-red-400'
  return 'bg-gray-500/15 text-gray-400'
})

const label = computed(() => `${props.value > 0 ? '+' : ''}${props.value.toFixed(2)}%`)
</script>

<template>
  <span class="rounded px-2 py-0.5 text-xs font-medium" :class="colorClass">{{ label }}</span>
</template>
