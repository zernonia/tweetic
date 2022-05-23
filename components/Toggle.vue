<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  name: String,
})
const emits = defineEmits(["update:modelValue"])

const onClick = (ev: InputEvent) => {
  let el = ev.target as HTMLInputElement
  emits("update:modelValue", el.checked)
}
</script>

<template>
  <label :for="name" class="inline-flex flex-col">
    <slot></slot>
    <div class="relative mt-1">
      <input type="checkbox" :id="name" class="sr-only" :value="modelValue" @change="onClick" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full transition"></div>
    </div>
  </label>
</template>

<style lang="postcss">
.toggle-bg:after {
  content: "";
  @apply absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm;
}

input:checked + .toggle-bg:after {
  transform: translateX(100%);
  @apply border-white;
}

input:checked + .toggle-bg {
  @apply bg-blue-500 border-blue-500;
}
</style>
