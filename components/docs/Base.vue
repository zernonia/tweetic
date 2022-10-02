<script setup lang="ts">
interface BaseProps {
  method: "GET" | "POST";
  url: string;
  description: string;
}

defineProps<BaseProps>()
</script>

<template>
  <div class="mt-20">
    <div class="relative flex items-center p-2 bg-light-600 rounded-xl overflow-x-auto">
      <div class="tag bg-blue-500 mr-2">{{ method }}</div>
      <input class="w-full md:mr-34 border-none" type="text" :value="url" disabled>
      <span class="hidden md:block absolute text-sm bg-light-600 text-gray-400 right-4 top-full md:top-auto">{{ description }}</span>
    </div>

    <div class="flex flex-col md:flex-row mt-12 md:space-x-6">
      <div class="md:w-1/2 flex flex-col">
        <div class="flex flex-col">
          <h4 class="text-xl font-semibold mb-4 text-gray-400">Query Params</h4>
          <slot name="config"></slot>
        </div>

        <div class="flex flex-col">
          <h4 class="mt-20 text-xl font-semibold mb-4 text-gray-400">Results</h4>
          <div class="tag bg-green-500">200</div>

          <div class="mt-4">
            <slot name="result"></slot>
          </div>
        </div>
      </div>

      <div class="min-h-80 w-full md:w-1/2 p-4 md:p-8 mt-4 md:mt-0 rounded-2xl bg-light-600">
        <slot name="preview"></slot>
      </div>
    </div>
  </div>
</template>
