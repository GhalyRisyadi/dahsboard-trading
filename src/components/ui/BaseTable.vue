<script setup lang="ts" generic="T extends Record<string, unknown>">
export interface Column {
  key: string
  label: string
  align?: 'left' | 'right'
}

defineProps<{
  columns: Column[]
  rows: T[]
  rowKey: keyof T & string
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
        <tr v-for="row in rows" :key="String(row[rowKey])" class="border-b border-gray-800/60">
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-2"
            :class="col.align === 'right' ? 'text-right' : 'text-left'"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
