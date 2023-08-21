<script setup>
import { useBaseStore } from "../stores/base";
import { useLSidebarStore } from "../stores/lSidebar";

const baseStore = useBaseStore();
const lSidebarStore = useLSidebarStore();

baseStore.fetchAuthor();
lSidebarStore.initUserView();
</script>

<template>
  <div class="flex w-full flex-col items-center pt-[2rem] text-normal-text-color">
    <div
      class="mb-[1rem] flex w-[20rem] flex-col items-center rounded-[1rem] bg-normal-bg py-[2rem] text-title-text-color">
      <span class="mx-auto block text-[1.2rem] font-semibold"> Tác giả </span>
      <img :src="baseStore.author.avatar" class="my-[1rem] h-[5rem] w-[5rem] rounded-[2.5rem] bg-normal-btn-bg" alt="" />
      <span class="block w-full pl-[1.5rem] text-[1rem]">
        <span class="font-semibold">Tên:</span>
        <span class="ml-[0.5rem]">{{ baseStore.author.name }}</span>
      </span>
      <span class="block w-full pl-[1.5rem] text-[1rem]">
        <span class="font-semibold">Email:</span>
        <span class="ml-[0.5rem]">{{ baseStore.author.email }}</span>
      </span>
    </div>

    <div class="relative max-lg:w-[calc(100vw-2rem)] lg:w-[calc(100vw-22rem)]">
      <span class="absolute left-[2rem] translate-y-[-50%] text-[1.2rem] font-semibold text-title-text-color">Giới
        thiệu</span>
      <span class="block h-[20rem] w-full rounded-[1rem] border-[2px] border-normal-btn-bg bg-normal-bg p-[1rem]">
        {{ baseStore.author.description }}
      </span>
    </div>
  </div>
</template>
