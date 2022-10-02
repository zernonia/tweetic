<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

interface ModalProps {
  open: boolean;
}

const target = ref();
const emit = defineEmits(["close"]);
const prop = defineProps<ModalProps>()

onClickOutside(target, () => {
  emit("close")
});

watch(
  () => prop.open,
  (isOpen) => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-light-100 bg-opacity-25 p-4 md:p-8 overflow-hidden"
    >
      <div
        class="z-0 absolute bg-black bg-opacity-50 h-full w-full inset-0"
      ></div>
      <div
        ref="target"
        class="z-1 overflow-y-scroll w-full h-full bg-white w-full max-w-screen-md h-full max-h-screen-md rounded-2xl border flex flex-col"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
