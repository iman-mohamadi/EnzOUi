<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps<{
  code: string,
  lang?: string
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
  <div class="relative my-4 overflow-hidden rounded-lg border border-white/10 bg-black">
    <div class="flex items-center justify-between border-b border-white/10 bg-black px-4 py-2">
      <span class="text-xs text-zinc-400 font-mono">
        {{ lang || 'text' }}
      </span>
      <button @click="copy" class="text-zinc-400 hover:text-white transition-colors">
        <Check v-if="copied" class="h-3.5 w-3.5 text-green-500" />
        <Copy v-else class="h-3.5 w-3.5" />
      </button>
    </div>
    <div class="p-4 overflow-x-auto">
      <pre><code class="hljs bg-black! font-mono text-sm leading-relaxed" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>