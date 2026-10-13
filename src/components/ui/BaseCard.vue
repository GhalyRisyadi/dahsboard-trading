<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <section class="rounded-lg border border-gray-800 bg-gray-900 p-4">
    <h3 v-if="title" class="mb-3 text-sm font-medium text-gray-400">{{ title }}</h3>
    <slot />
  </section>
</template>
