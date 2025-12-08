<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-screen flex-col bg-black text-white">

    <header class="container mx-auto flex h-14 items-center justify-between px-4 py-6">
      <div class="font-bold text-xl tracking-tight">EnzOUi</div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/docs/introduction">
          <Button variant="ghost" class="text-zinc-400 hover:text-white">Documentation</Button>
        </NuxtLink>
        <a href="https://github.com/iman-mohamadi/vue-wheel-picker" target="_blank">
          <Button variant="outline" class="border-white/20 hover:bg-white/10">GitHub</Button>
        </a>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center text-center px-4">
      <section class="max-w-[980px] space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">

        <div class="mx-auto w-fit rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
          v1.0.0 Now Available
        </div>

        <h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Beautifully designed components <br class="hidden sm:inline" />
          built with Vue & Shadcn.
        </h1>

        <p class="mx-auto max-w-[750px] text-lg text-zinc-400 sm:text-xl">
          Accessible. Customizable. Open Source.
          <br>
          Copy and paste into your apps.
        </p>

        <div class="flex justify-center gap-4">
          <NuxtLink to="/docs/components/wheel-picker">
            <Button size="lg" class="bg-white text-black hover:bg-zinc-200">
              Get Started
            </Button>
          </NuxtLink>
          <a href="https://github.com/iman-mohamadi/vue-wheel-picker" target="_blank">
            <Button size="lg" variant="outline" class="border-white/20 text-white hover:bg-white/10">
              <span class="mr-2">GitHub</span>
            </Button>
          </a>
        </div>
      </section>


    </main>

    <footer class="border-t border-white/10 py-6 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p class="text-center text-sm leading-loose text-zinc-400 md:text-left">
          Built by <a href="https://iman-mohammadi.vercel.app/" target="_blank" class="font-medium underline underline-offset-4 hover:text-white">Iman Mohammadi</a>.
          The source code is available on <a href="https://github.com/iman-mohamadi/vue-wheel-picker" target="_blank" class="font-medium underline underline-offset-4 hover:text-white">GitHub</a>.
        </p>
      </div>
    </footer>
  </div>
</template>