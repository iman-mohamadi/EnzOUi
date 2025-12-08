<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// Demo Data
const hours = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: (i + 1).toString().padStart(2, '0') }))
const val = ref(9)

const installCode = `npx shadcn-vue@latest add https://iman-mohamadi.github.io/vue-wheel-picker/registry/wheel-picker.json`
const usageCode = `<script setup>
import { WheelPicker, WheelPickerWrapper } from '@/components/ui/wheel-picker'
const hours = [{ value: 1, label: '01' }, { value: 2, label: '02' }]
<\/script>

<template>
  <WheelPickerWrapper>
    <WheelPicker :options="hours" infinite />
  </WheelPickerWrapper>
</template>`
</script>

<template>
  <div class="space-y-8">

    <div>
      <h1 class="text-4xl font-bold mb-2">Wheel Picker</h1>
      <p class="text-lg text-zinc-400">iOS-style 3D physics based picker.</p>
    </div>

    <div class="rounded-xl border border-white/10 bg-zinc-950 p-10 flex justify-center">
      <ClientOnly>
        <div class="w-32">
          <WheelPickerWrapper>
            <WheelPicker v-model="val" :options="hours" infinite />
          </WheelPickerWrapper>
        </div>
      </ClientOnly>
    </div>

    <section>
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Installation</h2>
      <CodeBlock :code="installCode" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Usage</h2>
      <CodeBlock :code="usageCode" />
    </section>

  </div>
</template>