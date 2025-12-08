<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

const props = defineProps<{ code: string }>()
const copied = ref(false)

const copy = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="relative my-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
    <div class="flex items-center justify-between border-b border-white/10 bg-zinc-900 px-4 py-2">
      <span class="text-xs text-zinc-400">Terminal / Code</span>
      <button @click="copy" class="text-zinc-400 hover:text-white">
        <Check v-if="copied" class="h-3.5 w-3.5 text-green-500" />
        <Copy v-else class="h-3.5 w-3.5" />
      </button>
    </div>
    <div class="p-4 overflow-x-auto">
      <pre class="font-mono text-sm text-zinc-300"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>