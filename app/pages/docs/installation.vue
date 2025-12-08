<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const cliCode = `npx shadcn-vue@latest add https://iman-mohamadi.github.io/vue-wheel-picker/registry/wheel-picker.json`
const manualCode = `# If you prefer manual installation:
# 1. Copy the files from the registry repo into your components folder.
# 2. Install dependencies:
npm install @vueuse/core`
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-4xl font-bold mb-2">Installation</h1>
      <p class="text-xl text-zinc-400">
        How to install the Wheel Picker component.
      </p>
    </div>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2">CLI (Recommended)</h2>
      <p class="text-zinc-400">
        Run the following command to download the component and its dependencies directly into your project:
      </p>
      <CodeBlock :code="cliCode" />
    </section>

    <section class="space-y-4 mt-8">
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2">Manual</h2>
      <p class="text-zinc-400">
        If you cannot use the CLI, you can copy the source code manually.
      </p>
      <CodeBlock :code="manualCode" />
    </section>
  </div>
</template>