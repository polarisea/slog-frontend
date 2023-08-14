<script setup>
import { useBaseStore } from "../stores/base";
import { useLSidebarStore } from "../stores/lSidebar";

const baseStore = useBaseStore();
const lSidebarStore = useLSidebarStore();

baseStore.fetchAuthor();
lSidebarStore.initHomeview();
</script>

<template>
  <div
    class="w-full flex items-center pt-[2rem] text-normal-text-color flex-col"
  >
    <div
      class="w-[20rem] bg-normal-bg rounded-[1rem] flex py-[2rem] flex-col items-center text-title-text-color mb-[1rem]"
    >
      <span class="block font-semibold text-[1.2rem] mx-auto"> Tác giả </span>
      <img
        :src="baseStore.author.avatar"
        class="w-[5rem] h-[5rem] rounded-[2.5rem] bg-normal-btn-bg my-[1rem]"
        alt=""
      />
      <span class="block text-[1rem] w-full pl-[1.5rem]">
        <span class="font-semibold">Tên:</span>
        <span class="ml-[0.5rem]">{{ baseStore.author.name }}</span>
      </span>
      <span class="block text-[1rem] w-full pl-[1.5rem]">
        <span class="font-semibold">Email:</span>
        <span class="ml-[0.5rem]">{{ baseStore.author.email }}</span>
      </span>
    </div>

    <div class="lg:w-[calc(100vw-22rem)] relative max-lg:w-[calc(100vw-2rem)]">
      <span
        class="absolute text-title-text-color text-[1.2rem] font-semibold left-[2rem] translate-y-[-50%]"
        >Giới thiệu</span
      >
      <span
        class="bg-normal-bg w-full block h-[20rem] rounded-[1rem] border-[2px] border-normal-btn-bg p-[1rem]"
      >
        {{ baseStore.author.description }}
      </span>
    </div>
  </div>
</template>
