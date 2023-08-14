<script setup>
import { useBaseStore } from "../stores/base";
import { useLSidebarStore } from "../stores/lSidebar";

const baseStore = useBaseStore();
const lSidebarStore = useLSidebarStore();

baseStore.fetchAuthor();
lSidebarStore.initUploadview();

function handleUpdate() {
  console.log("Handle update");
}
</script>
<template>
  <div
    class="w-full flex flex-col items-center text-normal-text-color pt-[2rem] pb-[1rem]"
  >
    <div
      class="w-[20rem] bg-normal-bg rounded-[1rem] flex py-[2rem] flex-col items-center text-title-text-color mb-[0.5rem]"
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
    <div
      class="w-[20rem] grid grid-cols-2 grid-rows-2 gap-y-[0.5rem] text-center text-title-text-color text-[1rem] font-semibold"
    >
      <span class="leading-[1.2rem]">
        Số lượng <br />
        bài viết
      </span>
      <span class="leading-[1.2rem]">
        Số lượng <br />
        người dùng
      </span>
      <span class="">100</span>
      <span class="">200</span>
    </div>
    <div class="lg:w-[calc(100vw-22rem)] relative max-lg:w-[calc(100vw-2rem)]">
      <div class="w-auto">
        <span
          class="text-title-text-color text-[1.2rem] font-semibold mb-[0.25rem] block leading-none"
          >Tên</span
        >
        <input
          type="text"
          class="w-full text-title-text-color text-[1rem] py-[0.75rem] pl-[1rem] border-border-color border-[2px] rounded-[0.5rem] outline-normal-btn-active"
          placeholder="Tên..."
        />
      </div>
      <div class="w-auto my-[0.5rem]">
        <span
          class="text-title-text-color text-[1.2rem] font-semibold mb-[0.25rem] block leading-none"
          >Email</span
        >
        <input
          type="text"
          class="w-full text-title-text-color text-[1rem] py-[0.75rem] pl-[1rem] border-border-color border-[2px] rounded-[0.5rem] outline-normal-btn-active"
          placeholder="Email..."
        />
      </div>
      <div class="w-auto">
        <span
          class="text-title-text-color text-[1.2rem] font-semibold mb-[0.25rem] block leading-none"
          >Giới thiệu</span
        >
        <textarea
          class="text-normal-text-color text-[1rem] resize-none rounded-[0.5rem] w-full border-border-color border-[2px] outline-normal-btn-active py-[0.25rem] px-[1rem]"
          placeholder="Giới thiệu..."
          rows="3"
        ></textarea>
      </div>
      <button
        class="mt-[0.5rem] text-normal-text-color text-[1.2rem] font-semibold bg-normal-btn-bg active:bg-normal-btn-active hover:bg-normal-btn-hover w-full py-[0.5rem] rounded-[0.5rem]"
        @click="handleUpdate"
      >
        Cập nhật
      </button>
    </div>
  </div>
</template>
