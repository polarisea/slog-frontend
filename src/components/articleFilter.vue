<script setup>
import { onMounted, ref, watch, nextTick, computed } from "vue";
import card from "../assets/svg/card.vue";
import classic from "../assets/svg/classic.vue";

import { useArticleStore } from "../stores/article";
import { storeToRefs } from "pinia";

const articleStore = useArticleStore();

const { viewType, sortBy } = storeToRefs(articleStore);

const sortboxItems = ref([
  { label: "Hot", value: 0 },
  { label: "New", value: 1 },
]);

const viewTypeItems = ref([
  { label: "Card", icon: "pi-card" },
  { label: "Classic", icon: "pi-classic" },
]);

const viewTypeIcon = computed(() => {
  return viewTypeItems.value[viewType.value].icon;
});

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
    class="w-full flex justify-between text-normal-text-color py-[0.5rem] items-center"
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
    <span class="relative">
      <button
        class="flex items-center px-[0.5rem] py-[0.25rem] rounded-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active focus:bg-normal-btn-hover viewbox-openbtn"
      >
        <i :class="'pi text-normal-text-color ' + viewTypeIcon"></i>
        <i class="pi pi-chevron-down ml-[0.25rem] text-[0.75rem]"></i>
      </button>
      <div
        class="absolute w-[10rem] shadow-md right-0 top-[2.5rem] bg-gray-50 py-[0.5rem] viewbox z-30"
      >
        <button
          class="text-[1rem] items-center flex w-full text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          :disabled="0 == viewType"
          @click="handleChangeViewType(0)"
        >
          <card :class="{ 'bg-black text-white': 0 == viewType }"></card>
          <span class="ml-[0.5rem]"> Card </span>
        </button>
        <button
          class="text-[1rem] items-center flex w-full text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          :disabled="1 == viewType"
          @click="handleChangeViewType(1)"
        >
          <classic :class="{ 'bg-black text-white': 1 == viewType }"></classic>
          <span class="ml-[0.5rem]"> Classic </span>
        </button>
      </div>
    </span>
  </div>
</template>

<style>
.sortbox-openbtn:focus + .sortbox {
  display: block;
}
.sortbox {
  display: none;
}

.sortbox:hover {
  display: block;
}

.sortbox:focus::after {
  display: none;
}
.viewbox-openbtn:focus + .viewbox {
  display: block;
}

.viewbox {
  display: none;
}

.viewbox:hover {
  display: block;
}
</style>
