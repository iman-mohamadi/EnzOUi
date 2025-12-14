<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  rows?: number
  cols?: number
  cellSize?: number
  interactive?: boolean
  borderColor?: string
  fillColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 8,
  cols: 27,
  cellSize: 56,
  interactive: true,
  borderColor: 'var(--cell-border-color)',
  fillColor: 'var(--cell-fill-color)',
})

const rippleKey = ref(0)
const clickedCell = ref<{ row: number; col: number } | null>(null)

// Generate cell data
const totalCells = computed(() => props.rows * props.cols)

const onCellClick = (row: number, col: number) => {
  if (!props.interactive) return
  clickedCell.value = { row, col }
  rippleKey.value += 1
}

const getCellStyle = (idx: number) => {
  const row = Math.floor(idx / props.cols)
  const col = idx % props.cols

  if (!clickedCell.value) return {}

  const distance = Math.hypot(
      clickedCell.value.row - row,
      clickedCell.value.col - col
  )

  const delay = distance * 55
  const duration = 200 + distance * 80

  return {
    '--delay': `${delay}ms`,
    '--duration': `${duration}ms`,
  }
}
</script>

<template>
  <div
      :class="cn(
      'absolute inset-0 h-full w-full',
      '[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]',
      'dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]',
      props.class
    )"
  >
    <div class="relative h-full w-full overflow-hidden">
      <div
          :key="rippleKey"
          :class="cn(
          'relative z-[3] mask-radial-from-20% mask-radial-at-top opacity-600',
          'grid mx-auto'
        )"
          :style="{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          width: `${cols * cellSize}px`,
          height: `${rows * cellSize}px`,
        }"
      >
        <div
            v-for="(idx) in Array.from({ length: totalCells }, (_, i) => i)"
            :key="idx"
            :class="cn(
            'cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]',
            clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
            !interactive && 'pointer-events-none'
          )"
            :style="{
            backgroundColor: fillColor,
            borderColor: borderColor,
            ...getCellStyle(idx)
          }"
            @click="onCellClick(Math.floor(idx / cols), idx % cols)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes cell-ripple {
  0% {
    background-color: var(--cell-fill-color);
  }
  50% {
    background-color: var(--cell-border-color);
    opacity: 0.8;
  }
  100% {
    background-color: var(--cell-fill-color);
  }
}

.animate-cell-ripple {
  animation: cell-ripple var(--duration) linear var(--delay) forwards;
}

/* Fallback for mask-radial if not using Tailwind plugin or custom config */
.mask-radial-from-20% {
  mask-image: radial-gradient(circle at center, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 100%);
}

.mask-radial-at-top {
  mask-position: top;
  -webkit-mask-position: top;
}
</style>