<script setup>
import { ref, computed } from "vue";

import { storeToRefs } from "pinia";

const { comments } = defineProps(["comments"]);

const sortboxItems = ref([
  { label: "Hot", value: 0 },
  { label: "New", value: 1 },
]);
const sortBy = ref(0);

const sortByLabel = computed(() => {
  return sortboxItems.value[sortBy.value].label;
});

async function handleChangeSortBy(event) {
  for (let i = 0; i < sortboxItems.value.length; i++) {
    if (event.target.textContent == sortboxItems.value[i].label) {
      sortBy.value = i;
      break;
    }
  }
}

function handleChangeViewType(newIndex) {
  viewType.value = newIndex;
}
</script>

<template>
  <div
    class="w-full flex justify-between text-normal-text-color py-[0.5rem] items-center mb-[0.5rem]"
  >
    <div class="flex items-center relative">
      <span class="text-[1rem] mr-[0.5rem]">Sắp xếp theo:</span>
      <button
        class="flex sortbox-openbtn text-[1rem] items-center px-[0.5rem] py-[0.25rem] rounded-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active focus:bg-normal-btn-hover"
      >
        <span class="">{{ sortByLabel }}</span>
        <i class="pi pi-chevron-down ml-[0.25rem] text-[0.75rem]"></i>
      </button>
      <div
        class="absolute w-[10rem] shadow-md right-0 top-[2.5rem] bg-gray-50 py-[0.5rem] sortbox z-30"
        @click="handleChangeSortBy"
      >
        <button
          class="text-[1rem] block w-full text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          v-for="item in sortboxItems"
          :disabled="item.label == sortByLabel"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <span class="block flex-1 mx-[0.5rem] h-[1px] bg-line-color"></span>
    <span class="relative font-semibold text-[0.9rem] text-title-text-color">
      {{ comments }}k comments
    </span>
  </div>
</template>
