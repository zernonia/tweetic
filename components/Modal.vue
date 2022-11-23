<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const prop = defineProps({
  open: Boolean,
});
const emit = defineEmits(["close"]);

const target = ref();
onClickOutside(target, (e) => {
  emit("close");
});

watch(
  () => prop.open,
  (n) => {
    n ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
  }
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-light-100 bg-opacity-25 p-4 md:p-8"
    >
      <div
        ref="target"
        class="overflow-y-scroll bg-white w-full max-w-screen-md h-full max-h-screen-md rounded-2xl border flex flex-col"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
