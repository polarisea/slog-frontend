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
    class="mb-[0.5rem] flex w-full items-center justify-between py-[0.5rem] text-normal-text-color"
  >
    <div class="relative flex items-center">
      <span class="mr-[0.5rem] text-[1rem]">Sắp xếp theo:</span>
      <button
        class="sortbox-openbtn flex items-center rounded-[1rem] px-[0.5rem] py-[0.25rem] text-[1rem] hover:bg-normal-btn-hover focus:bg-normal-btn-hover active:bg-normal-btn-active"
      >
        <span class="">{{ sortByLabel }}</span>
        <i class="pi pi-chevron-down ml-[0.25rem] text-[0.75rem]"></i>
      </button>
      <div
        class="sortbox absolute right-0 top-[2.5rem] z-30 w-[10rem] bg-gray-50 py-[0.5rem] shadow-md"
        @click="handleChangeSortBy"
      >
        <button
          class="block w-full px-[1rem] py-[0.5rem] text-left text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          v-for="item in sortboxItems"
          :disabled="item.label == sortByLabel"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <span class="mx-[0.5rem] block h-[1px] flex-1 bg-line-color"></span>
    <span class="relative text-[0.9rem] font-semibold text-title-text-color">
      {{ comments }}k comments
    </span>
  </div>
</template>
