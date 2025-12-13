<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export interface CodeTab {
  label: string
  code: string
  language?: string
}

interface Props {
  tabs?: CodeTab[]
  code?: string
  language?: string
  class?: string
  fileName?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'bash'
})

const activeTab = ref(0)
const copied = ref(false)
const preRef = ref<HTMLPreElement | null>(null)
const hasOverflow = ref(false)
const tabRefs = ref<HTMLElement[]>([])

const codeContent = computed(() => {
  if (props.tabs && props.tabs.length > 0) {
    return props.tabs
  }
  if (props.code) {
    return [{ label: props.language, code: props.code, language: props.language }]
  }
  return []
})

const currentEntry = computed(() => codeContent.value[activeTab.value])
const currentCode = computed(() => currentEntry.value?.code || '')
const currentLanguage = computed(() => currentEntry.value?.language || props.language)

const highlightedCode = computed(() => {
  const lang = currentLanguage.value
  const codeVal = currentCode.value
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(codeVal, { language: lang }).value
  }
  return hljs.highlightAuto(codeVal).value
})

const checkOverflow = () => {
  if (preRef.value) {
    hasOverflow.value = preRef.value.scrollWidth > preRef.value.clientWidth
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (preRef.value) {
    checkOverflow()
    resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(preRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

watch(activeTab, () => {
  nextTick(checkOverflow)
})

const handleCopy = async () => {
  await navigator.clipboard.writeText(currentCode.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const activeTabStyle = computed(() => {
  const el = tabRefs.value[activeTab.value]
  if (!el) return { display: 'none' }
  return {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
  }
})

const setTabRef = (el: any, index: number) => {
  if (el) tabRefs.value[index] = el
}
</script>

<template>
  <div
      :class="cn(
      'group relative overflow-hidden rounded-2xl border p-0.5',
      'border-zinc-950/10 dark:border-white/10',
      'bg-zinc-50 dark:bg-white/5',
      'text-zinc-950 dark:text-zinc-50',
      props.class
    )"
  >
    <div v-if="codeContent.length > 1 || fileName" class="flex items-center relative pr-2.5 bg-zinc-100/50 dark:bg-white/5 rounded-t-xl mb-0.5 min-h-[40px]">

      <div v-if="fileName && codeContent.length <= 1" class="px-4 text-xs text-zinc-400 font-mono">
        {{ fileName }}
      </div>

      <div
          v-if="codeContent.length > 1"
          role="tablist"
          class="flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide p-1"
      >
        <div class="relative flex gap-1">
          <div
              class="absolute bottom-0 h-0.5 bg-zinc-950 dark:bg-zinc-50 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
              :style="activeTabStyle"
          ></div>

          <button
              v-for="(tab, index) in codeContent"
              :key="`${tab.label}-${index}`"
              :ref="(el) => setTabRef(el, index)"
              type="button"
              role="tab"
              :aria-selected="activeTab === index"
              @click="activeTab = index"
              :class="cn(
              'flex items-center relative gap-1.5 px-3 py-1.5 outline-0 whitespace-nowrap font-medium transition-colors duration-150 rounded-lg',
              'hover:bg-zinc-200/50 dark:hover:bg-white/10',
              activeTab === index
                ? 'text-zinc-950 dark:text-zinc-50'
                : 'text-zinc-500 dark:text-zinc-400'
            )"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden">
      <button
          @click="handleCopy"
          :class="cn(
          'absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg',
          'text-zinc-500 dark:text-zinc-400',
          'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm',
          'border border-zinc-200/50 dark:border-zinc-800/50',
          'opacity-0 group-hover:opacity-100 transition-all duration-200',
          'hover:bg-zinc-200/50 dark:hover:bg-white/10',
          'hover:text-zinc-950 dark:hover:text-zinc-50'
        )"
          aria-label="Copy code"
      >
        <div class="relative w-3.5 h-3.5">
          <Transition name="scale">
            <Copy v-if="!copied" class="absolute inset-0 w-full h-full" />
            <Check v-else class="absolute inset-0 w-full h-full text-green-500" />
          </Transition>
        </div>
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>

      <pre
          ref="preRef"
          :class="cn(
          'p-4 text-sm leading-relaxed m-0',
          'bg-white dark:bg-zinc-950/50',
          (codeContent.length > 1 || fileName) ? 'rounded-b-2xl' : 'rounded-2xl',
          hasOverflow ? 'overflow-x-auto' : 'overflow-x-hidden',
          hasOverflow && 'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20 dark:scrollbar-thumb-white/10 dark:hover:scrollbar-thumb-white/20',
          hasOverflow && '[&::-webkit-scrollbar]:h-2'
        )"
      >
        <Transition name="fade" mode="out-in">
            <code
                :key="activeTab"
                class="font-mono text-zinc-950 dark:text-zinc-50 block whitespace-pre bg-transparent p-0"
                v-html="highlightedCode"
            />
        </Transition>
      </pre>
    </div>
  </div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(5px);
  filter: blur(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-5px);
  filter: blur(4px);
}
</style>