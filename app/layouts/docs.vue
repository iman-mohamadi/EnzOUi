<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const config = useAppConfig().enzoui
</script>

<template>
  <div class="min-h-screen bg-black text-white selection:bg-white/20">
    <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div class="container mx-auto flex h-14 items-center px-4">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2 font-bold text-xl">
          {{ config?.name || 'EnzOUi' }}
        </NuxtLink>
        <div class="flex flex-1 justify-end">
          <a :href="config?.github" target="_blank">
            <Button variant="ghost" size="icon"><Github class="h-5 w-5" /></Button>
          </a>
        </div>
      </div>
    </header>

    <div class="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] gap-6 px-4">

      <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-white/10 py-6 pr-6 md:sticky md:block">
        <nav class="space-y-6">

          <div>
            <h4 class="mb-2 rounded-md px-2 py-1 text-sm font-semibold">Getting Started</h4>
            <div class="grid grid-flow-row auto-rows-max text-sm gap-1">
              <NuxtLink to="/docs/introduction" class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/5" active-class="text-white bg-white/10 font-medium">
                Introduction
              </NuxtLink>
              <NuxtLink to="/docs/installation" class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/5" active-class="text-white bg-white/10 font-medium">
                Installation
              </NuxtLink>
            </div>
          </div>

          <div>
            <h4 class="mb-2 rounded-md px-2 py-1 text-sm font-semibold">Components</h4>
            <div class="grid grid-flow-row auto-rows-max text-sm gap-1">
              <NuxtLink to="/docs/components/wheel-picker" class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/5" active-class="text-white bg-white/10 font-medium">
                Wheel Picker
              </NuxtLink>
            </div>
          </div>

        </nav>
      </aside>

      <main class="relative py-6 max-w-3xl">
        <slot />
      </main>
    </div>
  </div>
</template>