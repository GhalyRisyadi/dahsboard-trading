<script setup lang="ts" generic="T extends object">
import type { Column } from '@/types/table'

defineProps<{
  columns: Column[]
  rows: T[]
  rowKey: keyof T & string
  // Jika diisi, tabel menjadi bisa dipilih: baris bisa diklik dan baris terpilih disorot.
  selectedKey?: string
}>()

const emit = defineEmits<{
  (e: 'row-click', row: T): void
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-800 text-gray-400">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-2 font-medium"
            :class="col.align === 'right' ? 'text-right' : 'text-left'"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="String(row[rowKey])"
          class="border-b border-gray-800/60"
          :class="[
            selectedKey !== undefined ? 'cursor-pointer hover:bg-gray-800/50' : '',
            selectedKey !== undefined && String(row[rowKey]) === selectedKey ? 'bg-gray-800' : '',
          ]"
          @click="emit('row-click', row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-2"
            :class="col.align === 'right' ? 'text-right' : 'text-left'"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key as keyof T]">
              {{ row[col.key as keyof T] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
