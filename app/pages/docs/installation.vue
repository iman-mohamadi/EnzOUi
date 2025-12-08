<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue'

definePageMeta({ layout: 'docs' })

const cliCode = `npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json`
const manualCode = `# If you cannot use the CLI, manual installation is supported.
# 1. Ensure you have the dependencies:
npm install @vueuse/core

# 2. Copy the component files from the repo into your project:
# src/components/ui/wheel-picker/
`
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-4xl font-bold mb-2">Installation</h1>
      <p class="text-xl text-zinc-400">
        Add the Wheel Picker to your project.
      </p>
    </div>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2">CLI (Recommended)</h2>
      <p class="text-zinc-400">
        Run this command to install the component and its dependencies automatically:
      </p>
      <CodeBlock :code="cliCode" />
    </section>

    <section class="space-y-4 mt-8">
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2">Manual</h2>
      <CodeBlock :code="manualCode" />
    </section>
  </div>
</template>