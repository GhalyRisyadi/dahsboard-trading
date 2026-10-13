<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMarketStore } from '@/stores/market'
import ChartPanel from '@/features/market/ChartPanel.vue'
import TickerTable from '@/features/market/TickerTable.vue'

const { selectedSymbol } = storeToRefs(useMarketStore())
</script>

<template>
  <h2 class="mb-4 text-xl font-semibold">Market</h2>
  <div class="flex flex-col gap-4">
    <ChartPanel :symbol="selectedSymbol" />
    <TickerTable />
  </div>
</template>
