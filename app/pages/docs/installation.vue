<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// --- Commands for Frameworks ---
const frameworkCommands = {
  vite: {
    create: 'npm create vite@latest my-app -- --template vue-ts',
    init: 'npx shadcn-vue@latest init',
    add: 'npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json'
  },
  nuxt: {
    create: 'npx nuxi@latest init my-app',
    init: 'npx shadcn-vue@latest init',
    add: 'npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json'
  },
  astro: {
    create: 'npm create astro@latest',
    init: 'npx shadcn-vue@latest init',
    add: 'npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json'
  },
  laravel: {
    create: 'composer create-project laravel/laravel my-app',
    init: 'npx shadcn-vue@latest init',
    add: 'npx shadcn-vue@latest add https://enzo-ui.vercel.app/registry/wheel-picker.json'
  },
  manual: {
    deps: 'npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-vue-next reka-ui @vueuse/core',
    utils: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
  }
}
</script>

<template>
  <div class="max-w-4xl space-y-10 pb-20 pt-10">

    <div class="space-y-4">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight text-white">Installation</h1>
      <p class="text-xl text-zinc-400">
        How to install dependencies and structure your app.
      </p>
    </div>

    <div class="space-y-6">
      <Tabs default-value="vite" class="space-y-6">

        <TabsList class="w-fit bg-zinc-900/50">
          <TabsTrigger value="vite" class="px-4">Vite</TabsTrigger>
          <TabsTrigger value="nuxt" class="px-4">Nuxt</TabsTrigger>
          <TabsTrigger value="astro" class="px-4">Astro</TabsTrigger>
          <TabsTrigger value="laravel" class="px-4">Laravel</TabsTrigger>
          <TabsTrigger value="manual" class="px-4">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="vite" class="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">1. Create project</h3>
            <p class="text-zinc-400">Start by creating a new Vue project using Vite.</p>
            <CodeBlock :code="frameworkCommands.vite.create" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">2. Run the CLI</h3>
            <p class="text-zinc-400">Initialize Shadcn Vue to set up Tailwind and CSS variables.</p>
            <CodeBlock :code="frameworkCommands.vite.init" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">3. Add EnzOUi Components</h3>
            <p class="text-zinc-400">You can now add any component from our registry.</p>
            <CodeBlock :code="frameworkCommands.vite.add" lang="bash" />
          </div>
        </TabsContent>

        <TabsContent value="nuxt" class="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">1. Create project</h3>
            <p class="text-zinc-400">Initialize a new Nuxt application.</p>
            <CodeBlock :code="frameworkCommands.nuxt.create" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">2. Run the CLI</h3>
            <p class="text-zinc-400">Run the Shadcn init command to configure `components.json` and Tailwind.</p>
            <CodeBlock :code="frameworkCommands.nuxt.init" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">3. Add EnzOUi Components</h3>
            <CodeBlock :code="frameworkCommands.nuxt.add" lang="bash" />
          </div>
        </TabsContent>

        <TabsContent value="astro" class="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">1. Create project</h3>
            <p class="text-zinc-400">Create a new Astro project.</p>
            <CodeBlock :code="frameworkCommands.astro.create" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">2. Run the CLI</h3>
            <p class="text-zinc-400">Initialize Shadcn Vue.</p>
            <CodeBlock :code="frameworkCommands.astro.init" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">3. Add EnzOUi Components</h3>
            <CodeBlock :code="frameworkCommands.astro.add" lang="bash" />
          </div>
        </TabsContent>

        <TabsContent value="laravel" class="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">1. Create project</h3>
            <p class="text-zinc-400">Start a new Laravel project.</p>
            <CodeBlock :code="frameworkCommands.laravel.create" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">2. Run the CLI</h3>
            <p class="text-zinc-400">Configure Shadcn Vue for Laravel.</p>
            <CodeBlock :code="frameworkCommands.laravel.init" lang="bash" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">3. Add EnzOUi Components</h3>
            <CodeBlock :code="frameworkCommands.laravel.add" lang="bash" />
          </div>
        </TabsContent>

        <TabsContent value="manual" class="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div class="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200">
            <p class="text-sm">We strongly recommend using the CLI tools above. Manual installation requires setting up Tailwind variables yourself.</p>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">1. Install Dependencies</h3>
            <p class="text-zinc-400">Install the required utility libraries and primitives.</p>
            <CodeBlock :code="frameworkCommands.manual.deps" lang="bash" />
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">2. Configure Utils</h3>
            <p class="text-zinc-400">Create a `lib/utils.ts` file for the class merger.</p>
            <CodeBlock :code="frameworkCommands.manual.utils" lang="typescript" file-name="lib/utils.ts" />
          </div>
        </TabsContent>

      </Tabs>
    </div>

  </div>
</template>