<script setup lang="ts" generic="T extends string | number">
import { ref, computed, watch, nextTick, onMounted, onUnmounted, provide } from 'vue';
import { cn } from '@/lib/utils';

export interface WheelPickerOption<T = string | number> {
  value: T;
  label: string;
}

const props = withDefaults(defineProps<{
  modelValue?: T;
  defaultValue?: T;
  options?: WheelPickerOption<T>[];
  infinite?: boolean;
  visibleCount?: number;
  dragSensitivity?: number;
  scrollSensitivity?: number;
  itemHeight?: number;
  class?: string;
  overlayClass?: string;
}>(), {
  options: () => [],
  infinite: false,
  visibleCount: 20,
  dragSensitivity: 3,
  scrollSensitivity: 5,
  itemHeight: 30,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: T): void; }>();

// --- 1. Data Handling ---
const childOptions = ref<WheelPickerOption<T>[]>([]);
provide('wheel-picker-register', (opt: WheelPickerOption<T>) => childOptions.value.push(opt));

const optionsProp = computed(() => (props.options?.length ? props.options : childOptions.value));

const options = computed(() => {
  if (!optionsProp.value?.length) return [];
  if (!props.infinite) return optionsProp.value;

  // Pad the array to ensure smooth rotation
  const result = [...optionsProp.value];
  // Ensure we have enough items to fill the cylinder face
  while (result.length < props.visibleCount) result.push(...optionsProp.value);
  return result;
});

// --- 2. Geometry ---
const measurements = computed(() => {
  const count = props.visibleCount;
  const height = props.itemHeight;
  const itemAngle = 360 / count;
  const radius = height / (2 * Math.tan(Math.PI / count));
  return {
    height,
    itemAngle,
    radius,
    containerHeight: Math.round(radius * 2 + height * 0.25),
    quarterCount: count / 4
  };
});

// List 1: The 3D Rotating Background
const wheelItems = computed(() => {
  const { itemAngle, quarterCount } = measurements.value;
  const src = options.value;
  if (!src.length) return [];

  const items = src.map((item, i) => ({ ...item, index: i, angle: -itemAngle * i }));

  if (props.infinite) {
    for (let i = 0; i < quarterCount; i++) {
      items.unshift({ ...src[src.length - 1 - (i % src.length)], index: -i - 1, angle: itemAngle * (i + 1) });
      items.push({ ...src[i % src.length], index: i + src.length, angle: -itemAngle * (i + src.length) });
    }
  }
  return items;
});

// List 2: The Flat Overlay Foreground
const highlightItems = computed(() => {
  const src = options.value;
  if (!src.length) return [];
  const items = src.map((item, i) => ({ ...item, key: i }));
  if (props.infinite) {
    items.unshift({ ...src[src.length - 1], key: 'start-inf' as any });
    items.push({ ...src[0], key: 'end-inf' as any });
  }
  return items;
});

// --- 3. Physics & DOM ---
const containerRef = ref<HTMLElement | null>(null);
const wheelRef = ref<HTMLElement | null>(null);
const highlightRef = ref<HTMLElement | null>(null);
const localValue = ref<T>(props.modelValue ?? props.defaultValue ?? (optionsProp.value[0]?.value as T));

let scrollRef = 0;
let moveId = 0;
let isDragging = false;
let lastWheelTime = 0;
let dragController: AbortController | null = null;
const touchData = { startY: 0, yList: [] as [number, number][], touchScroll: 0, isClick: true };

// --- 4. Logic ---
const RESISTANCE = 0.4;
const easeOutCubic = (p: number) => Math.pow(p - 1, 3) + 1;
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

const normalize = (val: number) => {
  const len = options.value.length;
  if (!len) return 0;
  return props.infinite ? ((val % len) + len) % len : val;
};

const updateStyles = (scroll: number) => {
  const { radius, itemAngle, quarterCount, height } = measurements.value;
  const norm = normalize(scroll);

  // 1. Update Background (3D Wheel)
  if (wheelRef.value) {
    wheelRef.value.style.transform = `translateZ(${-radius}px) rotateX(${itemAngle * norm}deg)`;

    for (const li of wheelRef.value.children as any) {
      if (!li.dataset.index) continue;
      const idx = parseFloat(li.dataset.index);
      const dist = Math.abs(idx - norm);

      // VISIBILITY LOGIC (The Ghost Fix)
      // Hide if:
      // 1. It is too far away (quarterCount)
      // 2. OR It is exactly in the center (dist < 0.2)
      //    We hide the center 3D item because the Overlay List will show it perfectly crisp.
      //    This prevents them from overlapping and creating the "Double Text" effect.
      if (dist > quarterCount || dist < 0.2) {
        li.style.visibility = 'hidden';
      } else {
        li.style.visibility = 'visible';
      }
    }
  }

  // 2. Update Foreground (Flat Overlay)
  if (highlightRef.value) {
    const hlScroll = props.infinite ? norm : clamp(scroll, 0, options.value.length - 1);
    highlightRef.value.style.transform = `translateY(${-hlScroll * height}px)`;
  }

  return norm;
};

const animate = (start: number, end: number, duration: number, done?: () => void) => {
  if (start === end || duration === 0) { updateStyles(start); return; }
  const startTime = performance.now();
  const diff = end - start;
  const tick = (now: number) => {
    const elapsed = (now - startTime) / 1000;
    if (elapsed < duration) {
      scrollRef = updateStyles(start + easeOutCubic(elapsed / duration) * diff);
      moveId = requestAnimationFrame(tick);
    } else {
      scrollRef = updateStyles(end);
      done?.();
    }
  };
  requestAnimationFrame(tick);
};

const snapToItem = (scroll: number) => {
  const opts = options.value;
  if (!opts.length) return;

  const norm = Math.round(scroll);
  const target = props.infinite ? norm : clamp(norm, 0, opts.length - 1);
  const dist = Math.abs(target - scrollRef);
  const duration = Math.sqrt(dist / props.scrollSensitivity);

  cancelAnimationFrame(moveId);
  animate(scrollRef, target, duration, () => {
    const finalIndex = props.infinite ? ((target % opts.length) + opts.length) % opts.length : target;
    const selected = opts[finalIndex];
    if (selected && selected.value !== localValue.value) {
      localValue.value = selected.value;
      emit('update:modelValue', selected.value);
    }
  });
};

// --- 5. Interaction ---
const handleDrag = (e: MouseEvent | TouchEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) return;
  if (e.cancelable) e.preventDefault();
  isDragging = true;
  touchData.startY = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY);
  touchData.yList = [[touchData.startY, Date.now()]];
  touchData.touchScroll = scrollRef;
  touchData.isClick = true;
  cancelAnimationFrame(moveId);

  const move = (ev: MouseEvent | TouchEvent) => {
    if (ev.cancelable) ev.preventDefault();
    const y = (ev instanceof MouseEvent ? ev.clientY : ev.touches[0].clientY);
    if (Math.abs(y - touchData.startY) > 5) touchData.isClick = false;
    touchData.yList.push([y, Date.now()]);

    const delta = (touchData.startY - y) / props.itemHeight;
    let next = scrollRef + delta;

    if (!props.infinite) {
      const max = options.value.length - 1;
      if (next < 0) next *= RESISTANCE;
      else if (next > max) next = max + (next - max) * RESISTANCE;
    }
    touchData.touchScroll = updateStyles(next);
  };

  const end = (ev: MouseEvent | TouchEvent) => {
    if (ev.cancelable) ev.preventDefault();
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
    isDragging = false;

    if (touchData.isClick) {
      if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect();
        const clickY = touchData.startY - rect.top - (rect.height / 2);
        const itemIdx = Math.round(clickY / props.itemHeight);
        snapToItem(scrollRef + itemIdx);
      }
      return;
    }

    scrollRef = touchData.touchScroll;
    const list = touchData.yList;
    const last = list[list.length - 1];
    const prev = list[list.length - 2];

    if (last && prev) {
      const timeDiff = last[1] - prev[1];
      const dist = prev[0] - last[0];
      const velocity = timeDiff > 0 ? (dist / props.itemHeight * 1000) / timeDiff : 0;
      const keepGoing = velocity * 0.2;
      snapToItem(scrollRef + keepGoing);
    } else {
      snapToItem(scrollRef);
    }
  };

  document.addEventListener('mousemove', move, { passive: false });
  document.addEventListener('mouseup', end);
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('touchend', end);
};

const handleWheel = (e: WheelEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) return;
  e.preventDefault();
  if (Date.now() - lastWheelTime < 50) return;
  lastWheelTime = Date.now();
  snapToItem(scrollRef + Math.sign(e.deltaY));
};

const init = () => {
  const idx = options.value.findIndex(o => o.value === localValue.value);
  if (idx !== -1) {
    scrollRef = idx;
    updateStyles(idx);
  }
};

watch(() => props.modelValue, (v) => {
  if (v !== undefined && v !== localValue.value) {
    localValue.value = v;
    init();
  }
});

watch(options, () => { nextTick(init); });

onMounted(() => {
  nextTick(init);
  if (containerRef.value) {
    containerRef.value.addEventListener('mousedown', handleDrag);
    containerRef.value.addEventListener('touchstart', handleDrag, { passive: false });
    containerRef.value.addEventListener('wheel', handleWheel, { passive: false });
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('mousedown', handleDrag);
    containerRef.value.removeEventListener('touchstart', handleDrag);
    containerRef.value.removeEventListener('wheel', handleWheel);
  }
});
</script>

<template>
  <div ref="containerRef" :class="cn($props.class)" :style="{ height: `${measurements.containerHeight}px` }" data-rwp>
    <slot />

    <ul ref="wheelRef" data-rwp-options>
      <li v-for="item in wheelItems" :key="`${item.index}-${item.value}`" :data-index="item.index" data-rwp-option
          :style="{
          top: `${measurements.height * -0.5}px`,
          height: `${measurements.height}px`,
          lineHeight: `${measurements.height}px`,
          transform: `rotateX(${item.angle}deg) translateZ(${measurements.radius}px)`,
        }">
        {{ item.label }}
      </li>
    </ul>

    <div :class="cn(props.overlayClass)" data-rwp-highlight-wrapper :style="{ height: `${measurements.height}px` }">
      <ul ref="highlightRef" data-rwp-highlight-list :style="{ top: props.infinite ? `-${measurements.height}px` : undefined }">
        <li v-for="item in highlightItems" :key="`${item.key}`" data-rwp-highlight-item :style="{ height: `${measurements.height}px`, lineHeight: `${measurements.height}px` }">
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Resets */
ul, li { margin: 0; padding: 0; list-style: none; }

[data-rwp] {
  position: relative;
  overflow: hidden;
  flex: 1;
  cursor: grab;
}
[data-rwp]:active {
  cursor: grabbing;
}

[data-rwp-highlight-wrapper] {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 10;
  border-top: 1px solid hsl(var(--border));
  border-bottom: 1px solid hsl(var(--border));
  background: hsl(var(--background) / 0.1);
  overflow: hidden; /* Ensures we only see one item from the flat list */
}

[data-rwp-highlight-list] {
  position: absolute;
  width: 100%;
}

[data-rwp-highlight-item] {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600; /* Bold for active item */
  color: hsl(var(--foreground));
}

[data-rwp-options] {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 0;
  transform-style: preserve-3d;
}

[data-rwp-option] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  will-change: transform, visibility;
}
</style>