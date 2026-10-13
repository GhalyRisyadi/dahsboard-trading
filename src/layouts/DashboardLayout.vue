<script setup lang="ts">
const navItems = [
  { to: '/market', label: 'Market' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/signals', label: 'Signals' },
]
</script>

<template>
  <div class="flex min-h-screen bg-gray-950 text-gray-100">
    <aside class="w-56 shrink-0 border-r border-gray-800 p-4">
      <h1 class="mb-6 text-lg font-semibold">Crypto AI</h1>
      <nav class="flex flex-col gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
          active-class="bg-gray-800 !text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="flex flex-1 flex-col">
      <header class="border-b border-gray-800 px-6 py-4 text-sm text-gray-400">
        Dashboard Trading
      </header>
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
