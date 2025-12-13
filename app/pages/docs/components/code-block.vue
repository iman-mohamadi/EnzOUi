<script setup lang="ts">

definePageMeta({ layout: 'docs' })

const simpleCode = `console.log("Hello EnzOUi")`

const multiTabCode = [
  {
    label: 'npm',
    code: 'npm install enzo-ui',
    language: 'bash'
  },
  {
    label: 'pnpm',
    code: 'pnpm add enzo-ui',
    language: 'bash'
  },
  {
    label: 'bun',
    code: 'bun add enzo-ui',
    language: 'bash'
  }
]

const usageCode = `<template>
  <CodeBlock
    :tabs="[
      { label: 'Script', code: 'const x = 1', language: 'typescript' },
      { label: 'Template', code: '<div>{{ x }}</div>', language: 'html' }
    ]"
  />
</template>`
</script>

<template>
  <div class="max-w-4xl space-y-10 pb-20 pt-10">

    <div class="space-y-4">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Code Block</h1>
      <p class="text-xl text-zinc-400">
        A beautiful, animated code block with tab support and syntax highlighting.
      </p>
    </div>

    <Tabs default-value="preview" class="space-y-4">
      <TabsList class="w-fit bg-zinc-900/50 border border-zinc-800">
        <TabsTrigger value="preview" class="px-4">Preview</TabsTrigger>
        <TabsTrigger value="code" class="px-4">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" class="relative rounded-xl border border-zinc-800 bg-zinc-950/50 mt-4 p-10 space-y-8">

        <div class="space-y-2">
          <h3 class="text-sm font-medium text-zinc-400">Simple</h3>
          <CodeBlock :code="simpleCode" language="javascript" />
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-medium text-zinc-400">Tabs</h3>
          <CodeBlock :tabs="multiTabCode" />
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-medium text-zinc-400">With Filename</h3>
          <CodeBlock :code="simpleCode" language="javascript" file-name="example.js" />
        </div>

      </TabsContent>

      <TabsContent value="code" class="mt-4">
        <CodeBlock :code="usageCode" language="vue" />
      </TabsContent>
    </Tabs>

    <div class="space-y-6">
      <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Props</h2>
      <div class="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
        <table class="w-full text-sm text-left">
          <thead class="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400">
          <tr>
            <th class="px-4 py-3 font-medium">Prop</th>
            <th class="px-4 py-3 font-medium">Type</th>
            <th class="px-4 py-3 font-medium">Description</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800 text-zinc-300">
          <tr>
            <td class="px-4 py-3 font-mono text-purple-400">code</td>
            <td class="px-4 py-3 font-mono text-xs">string</td>
            <td class="px-4 py-3">The code content to display (for single tab mode).</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-mono text-purple-400">language</td>
            <td class="px-4 py-3 font-mono text-xs">string</td>
            <td class="px-4 py-3">Language for syntax highlighting (default: bash).</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-mono text-purple-400">fileName</td>
            <td class="px-4 py-3 font-mono text-xs">string</td>
            <td class="px-4 py-3">Optional filename to display in the header (if no tabs).</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-mono text-purple-400">tabs</td>
            <td class="px-4 py-3 font-mono text-xs">CodeTab[]</td>
            <td class="px-4 py-3">Array of objects with <code>label</code>, <code>code</code>, and <code>language</code>.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>