<script setup>
import { ref } from "vue";
const emits = defineEmits(["close", "search"]);

const searchValue = ref();
function handleSearch() {
  emits("search", searchValue.value);
  //   searchValue.value = "";
  emits("close");
}
</script>
<template>
  <div
    class="fixed z-[100] w-[100vw] h-[100vh] top-0 left-0 bg-overlay-color"
    @click.self="emits('close')"
  >
    <div class="bg-white py-[1rem] w-full relative">
      <i
        class="pi pi-search absolute text-[1.5rem] top-[50%] translate-y-[-50%] ml-[3rem] text-title-text-color"
      ></i>
      <input
        v-model="searchValue"
        type="text"
        class="text-[1rem] text-normal-text-color border-[1px] border-border-color w-[calc(100vw-4rem)] ml-[2rem] px-[1rem] pl-[3rem] py-[1rem] rounded-[0.5rem] outline-green-btn-text-color"
        @keypress.enter="handleSearch"
      />
    </div>
  </div>
</template>
