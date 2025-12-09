<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, Copy, Terminal } from 'lucide-vue-next'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css' // Ensure a dark theme is loaded

const props = defineProps<{
  code: string,
  lang?: string,
  fileName?: string
}>()

const copied = ref(false)

const highlightedCode = computed(() => {
  const language = props.lang || 'bash'
  if (hljs.getLanguage(language)) {
    return hljs.highlight(props.code, { language }).value
  }
  return hljs.highlightAuto(props.code).value
})

const copy = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 dark text-zinc-50">
    <div class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
      <div class="flex items-center gap-2 text-xs font-medium text-zinc-400">
        <Terminal v-if="!fileName" class="h-3.5 w-3.5" />
        <span v-if="fileName">{{ fileName }}</span>
        <span v-else>{{ lang || 'bash' }}</span>
      </div>
      <button
          @click="copy"
          class="inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-zinc-800 hover:text-zinc-50 text-zinc-400"
          :aria-label="copied ? 'Copied' : 'Copy code'"
      >
        <Check v-if="copied" class="h-3.5 w-3.5" />
        <Copy v-else class="h-3.5 w-3.5" />
      </button>
    </div>

    <div class="overflow-x-auto p-4">
      <pre><code class="font-mono text-sm leading-relaxed bg-transparent" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<style scoped>
/* Minimal scrollbar for code blocks */
div::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 4px;
}
</style>