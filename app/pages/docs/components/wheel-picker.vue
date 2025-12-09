<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const hours = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: (i + 1).toString().padStart(2, '0') }))
const minutes = Array.from({ length: 60 }, (_, i) => ({ value: i, label: i.toString().padStart(2, '0') }))
const meridiem = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .map((m, i) => ({ value: i, label: m }))
const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))
const years = Array.from({ length: 50 }, (_, i) => ({ value: 2025 - i, label: (2025 - i).toString() }))

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'].map(f => ({ value: f, label: f }))
const scores = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i.toString() }))

const timeState = ref({ hour: 9, minute: 41, ampm: 'AM' })
const dateState = ref({ month: 5, day: 15, year: 2025 })
const fruitState = ref('Cherry')
const scoreState = ref(7)

const cliCommand = `npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json`
const manualCommand = `npm install @vueuse/core`

const usageCode = `<script setup lang="ts">
import { WheelPicker, WheelPickerWrapper } from '@/components/ui/wheel-picker'

const hours = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString().padStart(2, '0')
}))
<\/script>

<template>
  <WheelPickerWrapper>
    <WheelPicker :options="hours" infinite />
  </WheelPickerWrapper>
</template>`

// Updated Date Picker Code with correct classes
const dateCode = `<template>
  <WheelPickerWrapper>
    <WheelPicker v-model="month" :options="months" infinite class="flex-[2]" />
    <WheelPicker v-model="day" :options="days" infinite class="flex-1" />
    <WheelPicker v-model="year" :options="years" infinite class="flex-1" />
  </WheelPickerWrapper>
</template>`

const customCode = `<template>
  <WheelPickerWrapper>
    <WheelPicker
      v-model="score"
      :options="scores"
      overlay-class="bg-blue-500/10 border-blue-500 rounded-md"
    />
  </WheelPickerWrapper>
</template>`
</script>

<template>
  <div class="space-y-10 pb-10">
    <div class="space-y-4">
      <h1 class="text-4xl font-bold tracking-tight">Wheel Picker</h1>
      <p class="text-xl text-zinc-400">A high-performance, iOS-style 3D physics based picker.</p>
    </div>

    <div class="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
      <div class="flex h-[350px] items-center justify-center p-10">
        <ClientOnly>
          <div class="relative w-64 h-56 rounded-3xl border border-zinc-800 bg-black shadow-2xl overflow-hidden flex flex-col justify-center items-center">
            <div class="absolute top-0 left-1/2 w-24 h-6 bg-zinc-900 rounded-b-xl -translate-x-1/2 z-20"></div>
            <WheelPickerWrapper class="w-full px-6">
              <WheelPicker v-model="timeState.hour" :options="hours" infinite />
              <WheelPicker v-model="timeState.minute" :options="minutes" infinite />
              <WheelPicker v-model="timeState.ampm" :options="meridiem" />
            </WheelPickerWrapper>
          </div>
        </ClientOnly>
      </div>
    </div>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold tracking-tight">Installation</h2>
      <Tabs default-value="cli" class="w-full">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" class="pt-4"><CodeBlock :code="cliCommand" lang="bash" /></TabsContent>
        <TabsContent value="manual" class="pt-4"><CodeBlock :code="manualCommand" lang="bash" /></TabsContent>
      </Tabs>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold tracking-tight">Usage</h2>
      <CodeBlock :code="usageCode" lang="vue" />
    </section>

    <div class="space-y-12 pt-8">
      <h2 class="text-3xl font-bold tracking-tight">Examples</h2>

      <section class="space-y-4">
        <h3 class="text-xl font-semibold">Date Picker</h3>
        <p class="text-zinc-400">Combine multiple pickers to create a date selector.</p>
        <div class="rounded-xl border border-white/10 bg-zinc-950 p-10 flex justify-center">
          <ClientOnly>
            <div class="w-80">
              <WheelPickerWrapper>
                <WheelPicker v-model="dateState.month" :options="months" infinite class="flex-[2]" />
                <WheelPicker v-model="dateState.day" :options="days" infinite class="flex-1" />
                <WheelPicker v-model="dateState.year" :options="years" infinite class="flex-1" />
              </WheelPickerWrapper>
            </div>
          </ClientOnly>
        </div>
        <CodeBlock :code="dateCode" lang="vue" />
      </section>

      <section class="space-y-4">
        <h3 class="text-xl font-semibold">Custom Styling</h3>
        <p class="text-zinc-400">Use <code>overlay-class</code> to style the selection.</p>
        <div class="rounded-xl border border-white/10 bg-zinc-950 p-10 flex justify-center">
          <ClientOnly>
            <div class="w-32">
              <WheelPickerWrapper>
                <WheelPicker
                    v-model="scoreState"
                    :options="scores"
                    overlay-class="bg-blue-500/10 border-blue-500 rounded-md"
                />
              </WheelPickerWrapper>
            </div>
          </ClientOnly>
        </div>
        <CodeBlock :code="customCode" lang="vue" />
      </section>

      <section class="space-y-4">
        <h3 class="text-xl font-semibold">Non-Infinite</h3>
        <div class="rounded-xl border border-white/10 bg-zinc-950 p-10 flex justify-center">
          <ClientOnly>
            <div class="w-48">
              <WheelPickerWrapper>
                <WheelPicker v-model="fruitState" :options="fruits" infinite/>
              </WheelPickerWrapper>
            </div>
          </ClientOnly>
        </div>
      </section>
    </div>
  </div>
</template>